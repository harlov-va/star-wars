export const addHTTPS = (urls) => {
    if (Array.isArray(urls)) return urls.map((url) => url.indexOf(`https`) !== -1 ? url : url.replace(`http`,`https`))
    else return urls.indexOf(`https`) !== -1 ? urls : urls.replace(`http`,`https`); 
}