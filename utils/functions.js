export const currentDateTime = () => {
    var today = new Date(new Date().setHours(new Date().getHours() + 5, new Date().getMinutes() + 30));
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
}

export function mailErr(context, err) {
   try {
    
       Email.send({
           SecureToken: "0b7a80f3-c909-4122-b5b6-cbb242baca10",
           To: 'luckyvishesh675@gmail.com',
           From: "v@visheshsingh.com",
           Subject: "Notes Error while " + context,
           Body: err.message
        }).then(
            console.log("Error Handled")
            );
        } catch (error) {
        next(error) 
        } 
}

export const genArr = (length) => {
    let arr = ''
    const arr1 = '4629871350'
    const arr2 = 'vxlfwrdpoutijncmkzsegabhyq'
    const arrSel = [arr1, arr2];
    let el;
    function returnArrEl() {
        el = arrSel[Math.floor(Math.random() * 2)]
        return el[Math.floor(Math.random() * el.length)]
    }

    while (arr.length < length) {
        el = returnArrEl()
        if (el == arr[arr.length - 1]) {
            el = returnArrEl()
        }
        arr += el
    }
    return arr
}
