exports.getTimestamp = () => {
    const timestamp = Date.now();
    
    const dateObject = new Date(timestamp);
    const date = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    
    return `${date}:${month}:${year}:${hours}:${minutes}:${seconds}`;
}