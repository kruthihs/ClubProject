function getCookies(res) {
    let rawStrings = res.headers.raw()["set-cookie"]
    let cookies = [];
    rawStrings.forEach(function (ck) {
      cookies.push(ck.split(";")[0]); // Just grabs cookie name=value part
    });
    return cookies.join(";"); // If more than one cookie join with ;
}

export default getCookies;