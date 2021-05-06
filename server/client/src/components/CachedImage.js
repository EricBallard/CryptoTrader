import { useState, useEffect } from 'react'
import axios from 'axios'

/*
    Assumes 5mb on data is available in browser's local-storage
    Verified for all modern browsers (pc/mobile) [safari, chrome, firefox, opera, edge]
*/

/* Downloads, caches, and serves images as encoded base64 */
const CachedImage = ({ url, name }) => {
    const [src, setSrc] = useState(null)

    useEffect(() => {
        /* Check if exist in cache */
        let img = localStorage.getItem(name)

        if (img) {
            /* Retrieve from cache */
            setSrc(img)
        } else {
            /* Download */
            axios.get(url, { responseType: 'arraybuffer' }).then(response => {
                const base64 = 'data:;base64,' +
                    btoa(new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte), ''))

                /* Cache to brower's local storage */
                localStorage.setItem(name, base64)
                setSrc(base64)
            }).catch(err => console.log(err))
        }
    }, [url, name])

    /* Stored in aws s3 bucket, served with aws cloud front */
    return (
        <img className={name} alt={name} src={src} draggable='false' rel='prerender' />
    )
}

export default CachedImage