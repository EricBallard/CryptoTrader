import { useState, useEffect } from 'react'
import axios from 'axios'

/* Downloads image using axios and converts to base64 */
const download = async (url) => {
    return axios
        .get(url, {
            responseType: 'arraybuffer'
        })
        .then(response => Buffer.from(response.data, 'binary').toString('base64'))
}

/* Downloads, caches, and serves images as encoded base64 */
const CachedImage = ({ url, name }) => {
    const [src, setSrc] = useState('')

    useEffect(() => {
        /* Check if exist in cache */
        let img = localStorage.getItem(name)

        if (!img) {
            console.log('downloading image...')

            /* Download and cache */
            img = download(url)
            localStorage.setItem(name, img)
        } else
            console.log('IMG: ' + img)


        setSrc(img)
    })

    {/* Stored in aws s3 bucket, served with aws cloud front */ }
    return (
        <img className={name} alt={name} src={src} draggable='false' rel='prefetch' />
    )
}

export default CachedImage