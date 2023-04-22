    
    
    const themeIcon = document.querySelector(".__icon i")
    const body = document.body
    const notesContainer = document.querySelector(".notes__container")
    const overlayBox = document.querySelector(".overlay__box")
    const overlayBg = overlayBox.querySelector(".overlay__bg")
    const boxMain = overlayBox.querySelector(".box__main")
    const boxTitle = overlayBox.querySelector(".box__title")
    const addNewBtn = document.querySelector("#addNew")
    const crossBtn = overlayBox.querySelector("#cross")
    const textArea = document.querySelector("#textArea")
    const pView = boxMain.querySelector("#pView")
    const btn_1 = boxMain.querySelector(".btn__1")
    const btn_2 = boxMain.querySelector(".btn__2")
    let updateBtn;
    let createBtn;
    let editBtn;
    let cancelBtn1;
    let cancelBtn2;
    let deleteBtn;


    let themecode;

    //set cookie
    const setCookie = (cname, cvalue, exdays) => {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    // get cookie
    const getCookie = (cname) => {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    //generates new code
    const genArr = () => {
        let arr = ''
        let length = 18
        let arr1 = '4629871350'
        let arr2 = 'vxlfwrdpoutijncmkzsegabhyq'
        let arrSel = [arr1, arr2];
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
    //returns proper code before of it
    const ret = (code) => {
        code = +code;
        let y;
        code == 1 ? y = 10 : code == 10 ? y = 9 : code == 9 ? y = 8 : code == 8 ? y = 7 : code == 7 ? y = 6 : code == 6 ? y = 5 : code == 5 ? y = 4 : code == 4 ? y = 3 : code == 3 ? y = 2 : code == 2 ? y = 1 : ''
        return y
    }
    // add class
    const addC = (element, classtoadd) => {
        !element.classList.contains(classtoadd) ? element.classList.add(classtoadd) : ''
    }
    // remove class
    const rmvC = (element, classtormv) => {
        element.classList.contains(classtormv) ? element.classList.remove(classtormv) : ''
    }
    // add hidden class
    const addCH = (element) => {
        !element.classList.contains("hidden") ? addC(element, "hidden") : ''
    }
    // remove hidden class
    const rmvCH = (element) => {
        element.classList.contains("hidden") ? rmvC(element, "hidden") : ''
    }
    // return with bg
    const retBg = (bg) => {
        return "bg-" + bg;
    }
    // returns dpity of an element
    const getIty = (element) => {
        return element.getAttribute("dpity")
    }
    // sets dpity of an element
    const setIty = (element, infity) => {
        return setAttr(element, "dpity", infity)
    }
    // set attr
    const setAttr = (element, attribute, value) => {
        element.setAttribute(attribute, value)
    }
    // returns colourNo.
    const retCol = (i, limit) => {
        return (i % limit) + 1
    }
    //return colid
    const getColId = (element) => {
        return element.getAttribute("colid")
    }
    //retColClass
    const retColClass = (element) => {
        const arr = element.getAttribute("class").split(" ");
        return arr.find((item) => item.match("bg-couleur"))
    }
    // return ellipsesFormattedText
    const ellipsesformat = (data) => {
        let trimmedVer;
        if (data.length > 165) {
            trimmedVer = data.slice(0, 155) + "...."
        } else {
            trimmedVer = data
        }
        return trimmedVer
    }

    const retThem = (code) => {
        if (code === 0) {
            if (themecode === "light") {
                rmvC(themeIcon.parentElement.parentElement, "border-blue-500")
                addC(themeIcon.parentElement.parentElement, "border-slate-50")
                setTimeout(() => {
                    rmvC(themeIcon, "text-blue-500"); rmvC(themeIcon, "fa"); rmvC(themeIcon, "fa-moon-o");
                    addC(themeIcon, "text-yellow-400"); addC(themeIcon, "fas"); addC(themeIcon, "fa-sun");
                }, 100)
            }

        } else if (code === 1) {
            if (themecode === "dark") {
                rmvC(themeIcon.parentElement.parentElement, "border-slate-50")
                addC(themeIcon.parentElement.parentElement, "border-blue-500")
                setTimeout(() => {
                    rmvC(themeIcon, "text-yellow-400"); rmvC(themeIcon, "fas"); rmvC(themeIcon, "fa-sun");
                    addC(themeIcon, "text-blue-400"); addC(themeIcon, "fa"); addC(themeIcon, "fa-moon-o");
                }, 600)
            }
        }
    }
    const setColours = (code = 0) => {
        const notesCollec = notesContainer.querySelectorAll(".note_el")
        let i = 0
        for (const note of notesCollec) {
            setAttr(note, "colid", retCol(i, 10))
            if (code == 1) {
                rmvC(note, retColClass(note)); rmvC(note, "bg-slate-50/70"); addC(note, retBg("couleur" + getColId(note)))
                i++
            } else if (code == 0) {
                rmvC(note, retColClass(note)); rmvC(note, "bg-slate-50/70"); addC(note, "bg-slate-50/70");
                i++
            }
        }
    }

    const setThem = (code) => {
        const header = document.querySelector(".__header")
        const bg = document.querySelector(".__bg")
        if (code == 1) {
            rmvC(header, retBg("orange-600/80"))
            addC(header, retBg("[#232044]"))
            rmvC(bg, retBg("[url('bg.webp')]"))
            rmvC(bg, "blur-xl")
            addC(bg, retBg("[#0d0b1bde]"))
            setTimeout(() => setColours(code), 100)
            rmvC(themeIcon, "translate-x-4")
            rmvC(themeIcon, "animate-rToL")
            addC(themeIcon, "animate-lToR")
            setTimeout(() => {
                retThem(code)
            }, 400)
        } else if (code == 0) {
            rmvC(header, retBg("[#232044]"))
            addC(header, retBg("orange-600/80"))
            rmvC(bg, retBg("[#0d0b1bde]"))
            addC(bg, retBg("[url('bg.webp')]"))
            addC(bg, "blur-xl")
            setTimeout(() => setColours(code), 100)
            rmvC(themeIcon, "translate-x-4")
            rmvC(themeIcon, "animate-lToR")
            addC(themeIcon, "animate-rToL")
            setTimeout(() => {
                retThem(code)
            }, 400)
        }
    }

    const checkTheme = (manualCode) => {
        let currentCode;

        if (manualCode) {
            localStorage.setItem("CurrentThem", manualCode)
        } else if (localStorage.getItem("CurrentThem")) {
            currentCode = localStorage.getItem("CurrentThem")
        } else {
            localStorage.setItem("CurrentThem", "dark")
        }
        currentCode = localStorage.getItem("CurrentThem")
        themecode = currentCode;

        if (themecode == "dark") {
            setThem(1)
        } else if (themecode == "light") {
            setThem(0)
        }

    }

    function checkNotes() {
        if (themecode == "dark") {
            setColours(1)
        } else if (themecode == "light") {
            setColours(0)

        }
    }


    themeIcon.parentElement.onclick = () => {
        if (themeIcon.classList.contains("fa-sun")) {
            checkTheme("dark")
        } else
            if (themeIcon.classList.contains("fa-moon-o")) {
                checkTheme("light")
            }
    }

    overlayBg.onclick = () => {
        setTimeout(() => {
            addC(boxMain, "animate-scaleMeZoom")
            rmvC(boxMain, "border-slate-400/60")
            addC(boxMain, "border-red-600/70")
            setTimeout(() => {
                rmvC(boxMain, "border-red-600/70")
                addC(boxMain, "border-slate-400/60")
                rmvC(boxMain, "animate-scaleMeZoom")

            }, 300)
        }, 100)
    }

    crossBtn.onclick = () => {
        setIcon(2)
        rmvC(body, "overflow-hidden"); addC(overlayBox, "animate-scale100to0");
        setTimeout(() => {
            addCH(overlayBox); rmvC(overlayBox, "animate-scale100to0"); rmvC(overlayBox, "animate-scale0to100"); rmvC(overlayBox, "flex"); addCH(boxMain); rmvC(textArea, retColClass(textArea));
            addC(textArea, "bg-slate-200");
        }, 400);

    }



    const setBox = async (displayEL, infity, state = "view", note) => {
        const skeleton = document.querySelector(".skeleton_model")
        createBtn = ''
        cancelBtn1 = ''
        deleteBtn = ''
        editBtn = ''
        cancelBtn2 = ''
        updateBtn = ''

        setIty(boxMain, infity)
        if (state == "view") {
            boxTitle.innerHTML = `View Note`
            addCH(skeleton); addCH(textArea); addCH(pView); addCH(btn_1); addCH(btn_2);
            rmvCH(skeleton);
            btn_1.innerHTML = `Delete <i class="fa fa-trash-o"></i>`
            setAttr(btn_1, "id", "delete")
            btn_2.innerHTML = `Edit <i class="fa fa-pencil-square-o"></i>`
            setAttr(btn_2, "id", "edit")
            setIcon(1)

            const data = await fetch("/note/" + note.getAttribute("dpity"))
            const jsonData = await data.json();

            setTimeout(() => {
                if (jsonData.success == true) {
                    addCH(skeleton); addCH(textArea); addCH(pView);
                    rmvCH(pView);
                    rmvCH(btn_1); rmvCH(btn_2);
                    pView.innerHTML = jsonData.note.notesDat
                    note.innerHTML = ellipsesformat(pView.innerHTML)
                } else {
                    createNotification("Couldn't fetch this note", 0)

                }
            }, 2000)

            editBtn = document.getElementById("edit")
            deleteBtn = document.getElementById("delete")
            if (themecode == "dark") {
                rmvC(textArea, "bg-slate-200");
                addC(textArea, retBg("couleur" + getColId(note)));
            } else if (themecode == "light") {
                rmvC(textArea, retBg("couleur" + getColId(note)));
                addC(textArea, "bg-slate-200");
            }

            const deleteHandler = async () => {
                createNotification("Note is being deleted", 1, "no")
                setIcon(1)
                const data = await postData("/note/" + note.getAttribute("dpity"), {}, "DELETE")
                if (data.success == true) {
                    setIcon(2)
                    note.remove();
                    createNotification("Note Deleted", 1)
                    checkNotes()
                    rmvC(textArea, retColClass(textArea)); addC(textArea, "bg-slate-200");
                    rmvC(body, "overflow-hidden");
                    addC(overlayBox, "animate-scale100to0");
                    setTimeout(() => {
                        addCH(overlayBox); addC(overlayBox, "animate-scale0to100"); rmvC(overlayBox, "animate-scale100to0"); rmvC(overlayBox, "flex"); addCH(boxMain);
                        setTimeout(() => rmvC(overlayBox, "animate-scale100to0"), 50);
                    }, 400);
                } else {
                    setIcon(0)
                    createNotification("Note Deletion Failed", 0)

                }
            }

            deleteBtn.onclick = deleteHandler

            editBtn.onclick = editButtonHandler

            async function editButtonHandler() {
                setBox(pView.innerHTML, getIty(note), "edit", note);
            }



        } else if (state == "create" || state == "edit") {
            btn_1.innerHTML = `Cancel <i class="fa fa-ban"></i>`
            rmvCH(btn_1); rmvCH(btn_2);
            addCH(skeleton);
            if (state == "create") {
                rmvC(textArea, retColClass(textArea))
                addC(textArea, "bg-slate-200")
                boxTitle.innerHTML = `Create new Note`
                setAttr(btn_1, "id", "cancel1")
                btn_2.innerHTML = `Create <i class="fa fa-plus-square-o"></i>`
                setAttr(btn_2, "id", "create")
                textArea.innerHTML = ''
                textArea.value = ''
                addCH(textArea); addCH(pView); rmvCH(textArea);
                createBtn = document.getElementById("create")
                cancelBtn1 = document.getElementById("cancel1")
            } else if (state == "edit") {
                boxTitle.innerHTML = `Edit Note`
                setAttr(btn_1, "id", "cancel2")
                btn_2.innerHTML = `Update <i class="fa fa-refresh"></i>`
                setAttr(btn_2, "id", "update")
                addCH(textArea); addCH(pView); rmvCH(textArea);
                cancelBtn2 = overlayBox.querySelector("#cancel2")
                updateBtn = document.getElementById("update")
                textArea.value = displayEL;

                const focusHandler = function () {
                    pView.innerHTML = this.value;
                };

                textArea.oninput = focusHandler
                textArea.focus();

                updateBtn.onclick = updateButtonClickHandler
                async function updateButtonClickHandler() {
                    createNotification("Note is being updated", 1, "no")
                    setIcon(1)
                    const data = await postData("/note/" + note.getAttribute("dpity"), { notesData: textArea.value }, "PUT")
                    if (data.success == true) {
                        setIcon(2)
                        setBox(pView.innerHTML, getIty(note), "view", note);
                        createNotification("Note Updated", 1)
                    } else {
                        setIcon(0)
                        createNotification("Note Updation Failed", 0)

                    }

                }
                cancelBtn2.onclick = cancelButtonClickHandler

                function cancelButtonClickHandler() {
                    setBox(note.innerHTML,
                        getIty(note),
                        "view", note
                    );
                    setIcon(2)

                }

            }
        }

    }


    // Example POST method implementation:
    async function postData(url = "", data = {}, method) {
        // Default options are marked with *
        const response = await fetch(url, {
            method, // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }


    //create Element into DOM
    const createEl = async (innerContent, infity = "", CoLiD) => {
        const newEl = document.createElement("div")
        setIty(newEl, infity)
        addC(newEl, "note_el")
        setAttr(newEl, "colid", CoLiD)
        if (themecode == "dark") {
            addC(newEl, retBg("couleur" + getColId(newEl)))
        } else if (themecode == "light") {
            addC(newEl, retBg("slate-50/70"))
        }
        newEl.innerHTML = `${ellipsesformat(innerContent)}`
        notesContainer.prepend(newEl)
    }

    addNewBtn.onclick = addBtnHandler

    function addBtnHandler() {
        setBox("", "", "create")
        addC(body, "overflow-hidden")
        setTimeout(() => {
            rmvCH(overlayBox); addC(overlayBox, "flex")
            setTimeout(() => {
                addC(overlayBox, "animate-scale0t100rotate");
                setTimeout(() => {
                    rmvCH(boxMain); addC(boxMain, "animate-scale0t100");
                    setTimeout(() => rmvC(boxMain, "animate-scale0t100"), 400)
                    setTimeout(() => textArea.focus(), 200)
                }, 500)
            }, 10)

        }, 200);


        async function createNote() {

            if (textArea.value.length > 0) {
                createNotification("Note is being created", 1, "no")
                setIcon(1)
                let newColid;
                handleDemoNote()
                if (!notesContainer.querySelectorAll(".note_el").length == 0) {
                    newColid = +ret(getColId(notesContainer.querySelectorAll(".note_el")[0]))
                } else {
                    newColid = 10
                }
                const newNote = await postData("/note/new", { notesData: textArea.value }, "POST")
                if (newNote.success == true) {
                    setIcon(2)
                    createEl(newNote.note[0].notesDat, newNote.note[0].infIty, newColid);
                    createNotification("Note Created", 1)
                    rmvC(body, "overflow-hidden")
                    setTimeout(() => { rmvC(overlayBox, "animate-scale0t100rotate"); addCH(overlayBox); rmvC(overlayBox, "flex"); addCH(boxMain); }, 200);
                } else {
                    setIcon(0)
                    createNotification("Note coudln't be created", 0)
                }
            }

        }

        createBtn.onclick = createNote

        cancelBtn1.onclick = (e) => {
            setIcon(2)
            rmvC(body, "overflow-hidden"); addC(overlayBox, "animate-scale100to0");
            setTimeout(() => { addCH(overlayBox); rmvC(overlayBox, "animate-scale100to0"); rmvC(overlayBox, "animate-scale0to100"); rmvC(overlayBox, "flex"); addCH(boxMain); }, 400);
            rmvC(textArea, retColClass(textArea))
            addC(textArea, "bg-slate-200")
        }
    }

    notesContainer.onclick = noteFunctions

    function noteFunctions(e) {
        const clickedElement = e.target;
        if (clickedElement.classList.contains("note_el")) {

            setBox(clickedElement.innerHTML, getIty(clickedElement), "view", clickedElement);

            addC(body, "overflow-hidden");
            setTimeout(() => {
                rmvCH(overlayBox);
                addC(overlayBox, "flex");
                setTimeout(() => {
                    addC(overlayBox, "animate-scale0t100rotate");
                    setTimeout(() => {
                        rmvCH(boxMain);
                        addC(boxMain, "animate-scale0t100");
                        setTimeout(() => rmvC(boxMain, "animate-scale0t100"), 400);
                    }, 500);
                }, 10);
            }, 200);
        }
    }



    const checkNote = () => {
        document.getElementById("demo_note") ? notesContainer.onclick = e => e.preventDefault() : notesContainer.onclick = noteFunctions

        const notesAll = notesContainer.querySelectorAll(".note_el");
        if (notesAll.length == 0) {
            rmvC(notesContainer, "justify-center")
            addC(notesContainer, "justify-start")
            createEl("Start adding Notes, using the button on the top-right side!<br> Happy Noting!", "thisisdemo", 6)
            notesContainer.querySelectorAll(".note_el")[0].setAttribute("id", "demo_note")
            document.getElementById("demo_note") ? notesContainer.onclick = e => e.preventDefault() : notesContainer.onclick = noteFunctions

        }
        if (notesAll.length > 1 && (document.getElementById("demo_note"))) {
            handleDemoNote()
        }
        if (notesAll.length >= 6) addC(notesContainer, "justify-center"); rmvC(notesContainer, "justify-start");
    }

    const handleDemoNote = () => {
        if (document.getElementById("demo_note")) document.getElementById("demo_note").remove();
    }



    function setIcon(state = 0) {
        const spinner = document.querySelector(".spinner")
        switch (state) {
            case 0:
                rmvC(spinner, "upload_success"); rmvC(spinner, "upload_failed"); rmvC(spinner, "loading");
                addC(spinner, "upload_failed");
                spinner.querySelector("img").setAttribute("src", "/images/failed_cloud.png");
                break;
            case 1:
                rmvC(spinner, "upload_success"); rmvC(spinner, "upload_failed"); rmvC(spinner, "loading");
                addC(spinner, "loading")
                break;
            case 2:
                rmvC(spinner, "upload_success"); rmvC(spinner, "upload_failed"); rmvC(spinner, "loading");
                addC(spinner, "upload_success");
                spinner.querySelector("img").setAttribute("src", "/images/done_cloud.png");
                break;
            default:
                break;
        }
    }


    function createNotification(message, status = 0, needIcon = "yes") {
        const toasts = document.getElementById('toasts')
        const notif = document.createElement('div')
        notif.classList.add('toast')
        if (needIcon == "yes") {

            if (status == 0) {
                notif.classList.add("error")
                notif.innerHTML = `${message} <i class="far fas fa-times" aria-hidden="true"></i>`
            } else if (status == 1) {
                notif.classList.add("success")
                notif.innerHTML = `${message} <i class="fa fa-check font-semibold" aria-hidden="true"></i>`
            }
        } else if (needIcon == "no") {
            if (status == 0) {
                notif.classList.add("error")
                notif.innerHTML = `${message}`
            } else if (status == 1) {
                notif.classList.add("success")
                notif.innerHTML = `${message}`
            }
        }
        toasts.appendChild(notif)
        setTimeout(() => {
            notif.remove()
        }, 4000)
    }    
