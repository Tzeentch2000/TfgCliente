export function setCookie<T>(cName: string, cValue : T, expDays: number) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + JSON.stringify(cValue) + "; " + expires + "; path=/";
}

export function getCookie(cName: string): any {
    var result = document.cookie.match(new RegExp(cName + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
}
export function deleteCookie(cName: string){
    document.cookie = cName +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}