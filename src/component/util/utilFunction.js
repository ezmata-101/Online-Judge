export function timeConverter(UNIX_timestamp){
    const a = new Date(UNIX_timestamp);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
}

export function isTestInput(str1){
    str1 = str1.toLowerCase();
    return str1.substr(0, 4) === 'test' && str1.substr(5, 5) === 'input';
}
export function isTestOutput(str1){
    str1 = str1.toLowerCase();
    return str1.substr(0, 4) === 'test' && str1.substr(5, 6) === 'output';
}
export function isSampleInput(str1){
    str1 = str1.toLowerCase();
    return str1.substr(0, 6) === 'sample' && str1.substr(7, 5) === 'input';
}
export function isSampleOutput(str1){
    str1 = str1.toLowerCase();
    return str1.substr(0, 6) === 'sample' && str1.substr(7, 6) === 'output';
}
export function isStatement(str1){
    str1 = str1.toLowerCase();
    return str1 === 'statement.md';
}
export async function readFileSynchronously(file){
    return await new Promise((res) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            res(reader.result)
        }
        reader.readAsText(file)
    });
}