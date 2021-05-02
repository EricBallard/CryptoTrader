import { useState, useEffect } from 'react'
import axios from 'axios'

/* Downloads image using axios and converts to base64 */


/* Downloads, caches, and serves images as encoded base64 */
const CachedImage =  ({ url, name }) => {
    const [src, setSrc] = useState('')

    useEffect(() => {
        /* Check if exist in cache */
        let img = localStorage.getItem(name)

        if (img) {
             /* Retrieve from cache */
             setSrc(img)
        } else {
            /* Download and cache */
            console.log('DL: ' + url)

            axios.get(url, { responseType: 'arraybuffer' }).then(response => {
                const base64 = 'data:;base64,' +
                    btoa(new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte), ''))

                localStorage.setItem(name, base64)
                setSrc(base64)
            }).catch(err => console.log(err))
        }
    }, [url, name])

    /* Stored in aws s3 bucket, served with aws cloud front */
    return (
        <img className={name} alt={name} src={src} draggable='false' rel='prefetch' />
    )
}

export default CachedImage