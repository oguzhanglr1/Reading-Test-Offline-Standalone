(function () {
    var STORAGE_KEY = "readingTestOfflineData";
    var SESSION_KEY = "readingTestOfflineCurrentUser";
    var NOTICE_KEY = "readingTestOfflineNotice";
    var paragraphMap = {
        "30": [
            "Bugün erken kalkıp sessiz bir odada kısa bir metin okudum. Kelimeleri dikkatle izledikçe hızımın arttığını fark ettim. Sure doldugunda yazdiklarimi kontrol ettim ve odaklandigim zaman daha az hata yaptigimi gordum.",
            "Sabah kutuphaneye gittim ve pencere kenarinda kisa bir paragraf okudum. Cumleleri tekrar etmeden anlamaya calistikca dikkatim toparlandi. Deneme sonunda daha sakin oldugumda kelimeleri daha kolay hatirladigimi fark ettim.",
            "Aksamustu masama oturup kisa bir okuma alistirmasi yaptim. Ilk basta acele ettigim icin ayrintilari kacirdim ama sonra ritmimi buldum. Metni yeniden yazarken yavas ve duzenli calismanin sonucu belirgin bicimde iyilestirdigini gordum."
        ],
        "60": [
            "Okuma calismalari duzenli yapildiginda hem hiz hem de anlama becerisi gelisir. Bu testte amac yalnizca cabuk okumak degil, ayni zamanda metni akilda tutup dogru bicimde yeniden yazmaktir. Sessiz bir ortam secmek, zamani takip etmek ve dikkati dagitan etkenleri azaltmak sonucu belirgin bicimde iyilestirir. Her denemeden sonra hatalara bakmak, sonraki denemeyi daha verimli hale getirir.",
            "Bir metni verimli okumak icin gozlerin satir uzerinde akici hareket etmesi gerekir. Ancak hiz tek basina yeterli degildir; okuyucu, cumlelerin ana dusuncesini de yakalamalidir. Kisa aralar vermek, nefesi duzenlemek ve acele etmeden odaklanmak okuma performansini destekler. Duzenli tekrar yapan kisiler zaman icinde daha fazla ayrintiyi daha az hata ile hatirlayabilir.",
            "Okuma testi yaparken herkes once sureye dikkat eder, fakat asil farki yaratan sey odak kalitesidir. Paragrafi bolmeden, anlam butunlugunu koruyarak okumak hafizayi guclendirir. Deneme sonrasinda eksik ya da yanlis yazilan bolumleri incelemek gelisimi hizlandirir. Boylece kullanici, hangi durumlarda daha iyi performans gosterdigini daha net gorur."
        ],
        "90": [
            "Bir metni dikkatle okumak, yalnizca kelimeleri gormekten daha fazlasini gerektirir. Okuyucu, cumlelerin anlamini kavramali, onemli ayrintilari ayiklamali ve sure baskisi altinda odaklanmayi surdurebilmelidir. Reading Test uygulamasi bu becerileri olcmek icin tasarlanmistir. Kullanici once belirli bir kelime sayisi ve sure secer, sonra ekranda beliren paragrafi inceler. Sure doldugunda paragraf kaybolur ve kullanici hatirladiklarini yazar. Sonuclar, duzenli pratik yapildiginda gelisimin izlenmesini saglar ve kisinin guclu ya da zayif yonlerini daha net gormesine yardimci olur.",
            "Duzenli okuma aliskanligi, yalnizca akademik basariyi degil, gunluk hayatta bilgiye hizli ulasmayi da kolaylastirir. Bir paragrafi dikkatle inceleyen kisi, ana fikri daha cabuk yakalar ve ayrintilari zihninde daha uzun sure tutabilir. Ancak bu beceri, plansiz tekrarlarla degil, olculu ve bilincli calismayla gelisir. Sure tutularak yapilan alistirmalar, okuyucunun hem ritmini hem de dayanikliligini artirir. Her denemede farkli bir metinle karsilasmak ise ezberi degil, gercek anlama becerisini ortaya cikarir ve kullanicinin gelisimini daha dogru gostermeye yardim eder.",
            "Hafiza ve odak, okuma performansinin iki temel unsurudur. Kisi metni gorur gormez hizlanmaya calistiginda, cogu zaman ayrintilar gozunden kacar. Oysa once cumle yapisini anlamak, sonra metnin butunune hakim olmak daha saglam bir sonuc verir. Okuma testi gibi uygulamalar, kullaniciya yalnizca kac kelime hatirladigini degil, nasil calistiginda daha verimli oldugunu da ogretir. Sessiz bir ortam, dogru sure secimi ve duzenli tekrar sayesinde kisa surede gozle gorulur bir ilerleme saglanabilir. Bu nedenle farkli uzunlukta ve farkli icerikte paragraflarla calismak, beceriyi tek yonlu degil dengeli sekilde gelistirir."
        ]
    };

    function getRandomParagraph(wordCount, previousParagraph) {
        var paragraphs = paragraphMap[wordCount] || [];
        if (!paragraphs.length) {
            return "Paragraf bulunamadi.";
        }

        if (paragraphs.length === 1) {
            return paragraphs[0];
        }

        var pool = paragraphs.filter(function (paragraph) {
            return paragraph !== previousParagraph;
        });
        var source = pool.length ? pool : paragraphs;
        var index = Math.floor(Math.random() * source.length);

        return source[index];
    }

    function loadData() {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                return JSON.parse(raw);
            } catch (error) {
                console.error(error);
            }
        }

        var initial = {
            users: [],
            comments: [],
            scores: [],
            nextCommentId: 1,
            nextScoreId: 1
        };

        saveData(initial);
        return initial;
    }

    function saveData(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function getCurrentUser() {
        var email = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
        if (!email) {
            return null;
        }

        var data = loadData();
        return data.users.find(function (user) {
            return user.email === email;
        }) || null;
    }

    function setCurrentUser(email) {
        sessionStorage.setItem(SESSION_KEY, email);
        localStorage.setItem(SESSION_KEY, email);
    }

    function clearCurrentUser() {
        sessionStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(SESSION_KEY);
    }

    function showNotice(message, variant) {
        var notice = document.createElement("div");
        notice.className = "app-notice" + (variant ? " is-" + variant : "");
        notice.textContent = message;

        document.body.appendChild(notice);

        requestAnimationFrame(function () {
            notice.classList.add("is-visible");
        });

        window.setTimeout(function () {
            notice.classList.remove("is-visible");
            window.setTimeout(function () {
                if (notice.parentNode) {
                    notice.parentNode.removeChild(notice);
                }
            }, 220);
        }, 2600);
    }

    function setFlashNotice(message, variant) {
        sessionStorage.setItem(NOTICE_KEY, JSON.stringify({
            message: message,
            variant: variant || "success"
        }));
    }

    function consumeFlashNotice() {
        var raw = sessionStorage.getItem(NOTICE_KEY);
        if (!raw) {
            return;
        }

        sessionStorage.removeItem(NOTICE_KEY);

        try {
            var payload = JSON.parse(raw);
            if (payload && payload.message) {
                showNotice(payload.message, payload.variant);
            }
        } catch (error) {
            console.error(error);
        }
    }

    function redirect(path) {
        window.location.href = path;
    }

    function requireAuth() {
        var user = getCurrentUser();
        if (!user) {
            redirect("login.html");
            return null;
        }
        return user;
    }

    function attachLinkHandlers() {
        document.querySelectorAll("[data-link]").forEach(function (element) {
            element.addEventListener("click", function () {
                redirect(element.getAttribute("data-link"));
            });
        });
    }

    function bindLogout(buttonId) {
        var button = document.getElementById(buttonId);
        if (!button) {
            return;
        }
        button.addEventListener("click", function (event) {
            event.preventDefault();
            clearCurrentUser();
            redirect("index.html");
        });
    }

    function setUserBadges(user, ids) {
        ids.forEach(function (id) {
            var element = document.getElementById(id);
            if (element) {
                element.textContent = user.kullanici_adi;
            }
        });
    }

    function showError(id, message) {
        var element = document.getElementById(id);
        if (!element) {
            return;
        }
        element.textContent = message;
        element.classList.remove("hidden");
    }

    function hideError(id) {
        var element = document.getElementById(id);
        if (!element) {
            return;
        }
        element.textContent = "";
        element.classList.add("hidden");
    }

    function cleanText(text) {
        return text.toLowerCase().replace(/[^a-zA-Z0-9çğıöşü\s]/gi, "").trim();
    }

    function renderEmptyRow(tbody, columnCount, message) {
        tbody.textContent = "";

        var row = document.createElement("tr");
        var cell = document.createElement("td");
        cell.colSpan = columnCount;
        cell.className = "empty-row";
        cell.textContent = message;
        row.appendChild(cell);
        tbody.appendChild(row);
    }

    function createCellRow(values) {
        var row = document.createElement("tr");

        values.forEach(function (value) {
            var cell = document.createElement("td");
            cell.textContent = String(value);
            row.appendChild(cell);
        });

        return row;
    }

    function createActionButton(label, dataAttribute, dataValue) {
        var button = document.createElement("button");
        button.className = "danger-button";
        button.setAttribute(dataAttribute, String(dataValue));
        button.textContent = label;

        return button;
    }

    function createRowWithAction(values, button) {
        var row = createCellRow(values);
        var actionCell = document.createElement("td");
        actionCell.appendChild(button);
        row.appendChild(actionCell);

        return row;
    }

    function replaceTableRows(tbody, rows) {
        tbody.textContent = "";
        rows.forEach(function (row) {
            tbody.appendChild(row);
        });
    }

    function sortScores(scores) {
        return scores.slice().sort(function (left, right) {
            var timeCompare = Number(left.zaman) - Number(right.zaman);
            if (timeCompare !== 0) {
                return timeCompare;
            }

            var wordCompare = Number(left.kelime_sayisi) - Number(right.kelime_sayisi);
            if (wordCompare !== 0) {
                return wordCompare;
            }

            return Number(right.dogru_kelime_sayisi) - Number(left.dogru_kelime_sayisi);
        });
    }

    function initLogin() {
        var user = getCurrentUser();
        if (user) {
            redirect("welcome.html");
            return;
        }

        var form = document.getElementById("loginForm");
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            hideError("loginError");

            var formData = new FormData(form);
            var email = formData.get("email").trim();
            var sifre = formData.get("sifre");
            var data = loadData();
            var matchedUser = data.users.find(function (item) {
                return item.email === email && item.sifre === sifre;
            });

            if (!matchedUser) {
                showError("loginError", "Hatalı e-posta veya şifre.");
                return;
            }

            setCurrentUser(matchedUser.email);
            redirect("welcome.html");
        });
    }

    function initRegister() {
        var user = getCurrentUser();
        if (user) {
            redirect("welcome.html");
            return;
        }

        var form = document.getElementById("registerForm");
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            hideError("registerError");

            var formData = new FormData(form);
            var candidate = {
                kullanici_adi: String(formData.get("kullanici_adi") || "").trim(),
                isim: String(formData.get("isim") || "").trim(),
                soyisim: String(formData.get("soyisim") || "").trim(),
                email: String(formData.get("email") || "").trim().toLowerCase(),
                sifre: String(formData.get("sifre") || "")
            };

            var data = loadData();
            var duplicateUser = data.users.some(function (item) {
                return item.email === candidate.email || item.kullanici_adi.toLowerCase() === candidate.kullanici_adi.toLowerCase();
            });

            if (duplicateUser) {
                showError("registerError", "Bu e-posta veya kullanıcı adı zaten kayıtlı.");
                return;
            }

            data.users.push(candidate);
            saveData(data);
            setCurrentUser(candidate.email);
            redirect("welcome.html");
        });
    }

    function initWelcome() {
        var user = requireAuth();
        if (!user) {
            return;
        }

        setUserBadges(user, ["userName"]);
        bindLogout("logoutButton");

        var startButton = document.getElementById("startButton");
        var commentButton = document.getElementById("commentButton");
        var userComment = document.getElementById("userComment");
        var wordCountSelect = document.getElementById("wordCountSelect");
        var timeSelect = document.getElementById("timeSelect");
        var timerDisplay = document.getElementById("timerDisplay");
        var paragraphText = document.getElementById("paragrafText");
        var resultMessage = document.getElementById("resultMessage");
        var originalParagraph = "";
        var lastParagraphByWordCount = {};
        var testStarted = false;
        var timerInterval = null;

        function updateTimerDisplay(milliseconds) {
            var minutes = Math.floor(milliseconds / 60000);
            var seconds = Math.floor((milliseconds % 60000) / 1000);
            timerDisplay.textContent = minutes + " dakika " + (seconds < 10 ? "0" : "") + seconds + " saniye";
        }

        function finishTest() {
            if (timerInterval) {
                clearInterval(timerInterval);
            }

            timerDisplay.textContent = "Süre doldu!";
            paragraphText.textContent = "";
            userComment.readOnly = false;
            wordCountSelect.disabled = false;
            timeSelect.disabled = false;
            startButton.disabled = false;
            commentButton.disabled = false;
            testStarted = false;
        }

        startButton.addEventListener("click", function () {
            if (testStarted) {
                return;
            }

            resultMessage.textContent = "";
            userComment.value = "";
            originalParagraph = getRandomParagraph(wordCountSelect.value, lastParagraphByWordCount[wordCountSelect.value]);
            lastParagraphByWordCount[wordCountSelect.value] = originalParagraph;
            paragraphText.textContent = originalParagraph;
            testStarted = true;
            userComment.readOnly = true;
            wordCountSelect.disabled = true;
            timeSelect.disabled = true;
            startButton.disabled = true;
            commentButton.disabled = true;

            var remaining = Math.round(parseFloat(timeSelect.value) * 60 * 1000);
            updateTimerDisplay(remaining);

            timerInterval = setInterval(function () {
                remaining -= 1000;
                if (remaining <= 0) {
                    finishTest();
                    return;
                }
                updateTimerDisplay(remaining);
            }, 1000);
        });

        commentButton.addEventListener("click", function () {
            var originalWords = cleanText(originalParagraph).split(/\s+/).filter(Boolean);
            var userWords = cleanText(userComment.value).split(/\s+/).filter(Boolean);
            var correctWords = 0;

            userWords.forEach(function (word) {
                if (originalWords.includes(word)) {
                    correctWords += 1;
                }
            });

            resultMessage.textContent = "Sonuç: " + correctWords + " doğru kelime!";

            var data = loadData();
            data.scores.push({
                id: data.nextScoreId++,
                email: user.email,
                kullanici_adi: user.kullanici_adi,
                zaman: timeSelect.value,
                kelime_sayisi: Number(wordCountSelect.value),
                dogru_kelime_sayisi: correctWords,
                createdAt: new Date().toISOString()
            });
            saveData(data);

            commentButton.disabled = true;
            showNotice("Sonuc kaydedildi. Dogru kelime sayisi: " + correctWords, "success");
        });
    }

    function initProfil() {
        var user = requireAuth();
        if (!user) {
            return;
        }

        document.getElementById("profileUsername").textContent = user.kullanici_adi;
        document.getElementById("profileIsim").textContent = user.isim;
        document.getElementById("profileSoyisim").textContent = user.soyisim;
        document.getElementById("profileEmail").textContent = user.email;
    }

    function initEditUsername() {
        var user = requireAuth();
        if (!user) {
            return;
        }

        var form = document.getElementById("usernameForm");
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            hideError("usernameError");

            var formData = new FormData(form);
            var newUsername = String(formData.get("new_username") || "").trim();
            var data = loadData();
            var exists = data.users.some(function (candidate) {
                return candidate.email !== user.email && candidate.kullanici_adi.toLowerCase() === newUsername.toLowerCase();
            });

            if (!newUsername) {
                showError("usernameError", "Yeni kullanıcı adı boş olamaz.");
                return;
            }

            if (exists) {
                showError("usernameError", "Bu kullanıcı adı zaten kullanılıyor.");
                return;
            }

            data.users = data.users.map(function (candidate) {
                if (candidate.email === user.email) {
                    candidate.kullanici_adi = newUsername;
                }
                return candidate;
            });

            data.comments = data.comments.map(function (comment) {
                if (comment.email === user.email) {
                    comment.kullanici_adi = newUsername;
                }
                return comment;
            });

            data.scores = data.scores.map(function (score) {
                if (score.email === user.email) {
                    score.kullanici_adi = newUsername;
                }
                return score;
            });

            saveData(data);
            setFlashNotice("Kullanici adi guncellendi.", "success");
            redirect("profil.html");
        });
    }

    function initEditPassword() {
        var user = requireAuth();
        if (!user) {
            return;
        }

        var form = document.getElementById("passwordForm");
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            hideError("passwordError");

            var formData = new FormData(form);
            var currentPassword = String(formData.get("current_password") || "");
            var newPassword = String(formData.get("new_password") || "");
            var confirmPassword = String(formData.get("confirm_password") || "");

            if (currentPassword !== user.sifre) {
                showError("passwordError", "Mevcut şifre yanlış!");
                return;
            }

            if (newPassword !== confirmPassword) {
                showError("passwordError", "Yeni şifreler eşleşmiyor!");
                return;
            }

            var data = loadData();
            data.users = data.users.map(function (candidate) {
                if (candidate.email === user.email) {
                    candidate.sifre = newPassword;
                }
                return candidate;
            });
            saveData(data);
            setFlashNotice("Sifre guncellendi.", "success");
            redirect("profil.html");
        });
    }

    function initScores() {
        var user = requireAuth();
        if (!user) {
            return;
        }

        setUserBadges(user, ["scoresUserName"]);
        bindLogout("scoresLogoutButton");

        var data = loadData();
        var allScoresBody = document.getElementById("allScoresBody");
        var myScoresBody = document.getElementById("myScoresBody");
        document.getElementById("myScoresTitle").textContent = user.kullanici_adi + " - Benim Skorlarım";

        var sortedScores = sortScores(data.scores);
        if (!sortedScores.length) {
            renderEmptyRow(allScoresBody, 4, "Henüz skor bulunmuyor.");
        } else {
            replaceTableRows(allScoresBody, sortedScores.map(function (score) {
                return createCellRow([
                    score.kullanici_adi,
                    score.zaman,
                    score.kelime_sayisi,
                    score.dogru_kelime_sayisi
                ]);
            }));
        }

        var myScores = sortedScores.filter(function (score) {
            return score.email === user.email;
        });
        if (!myScores.length) {
            renderEmptyRow(myScoresBody, 4, "Henüz size ait skor bulunmuyor.");
        } else {
            replaceTableRows(myScoresBody, myScores.map(function (score) {
                return createRowWithAction([
                    score.zaman,
                    score.kelime_sayisi,
                    score.dogru_kelime_sayisi
                ], createActionButton("Sil", "data-score-id", score.id));
            }));

            myScoresBody.querySelectorAll("[data-score-id]").forEach(function (button) {
                button.addEventListener("click", function () {
                    var scoreId = Number(button.getAttribute("data-score-id"));
                    var nextData = loadData();
                    nextData.scores = nextData.scores.filter(function (score) {
                        return !(score.id === scoreId && score.email === user.email);
                    });
                    saveData(nextData);
                    showNotice("Skor silindi.", "success");
                    initScores();
                });
            });
        }
    }

    function initComments() {
        var user = requireAuth();
        if (!user) {
            return;
        }

        setUserBadges(user, ["commentsUserName"]);
        bindLogout("commentsLogoutButton");

        var form = document.getElementById("commentForm");
        var allCommentsBody = document.getElementById("allCommentsBody");
        var myCommentsBody = document.getElementById("myCommentsBody");
        document.getElementById("myCommentsTitle").textContent = user.kullanici_adi + " - Benim Yorumlarım";

        function renderComments() {
            var data = loadData();
            if (!data.comments.length) {
                renderEmptyRow(allCommentsBody, 2, "Henüz yorum bulunmuyor.");
            } else {
                replaceTableRows(allCommentsBody, data.comments.map(function (comment) {
                    return createCellRow([
                        comment.kullanici_adi,
                        comment.yorum
                    ]);
                }));
            }

            var mine = data.comments.filter(function (comment) {
                return comment.email === user.email;
            });

            if (!mine.length) {
                renderEmptyRow(myCommentsBody, 2, "Henüz size ait yorum bulunmuyor.");
                return;
            }

            replaceTableRows(myCommentsBody, mine.map(function (comment) {
                return createRowWithAction([
                    comment.yorum
                ], createActionButton("Sil", "data-comment-id", comment.id));
            }));

            myCommentsBody.querySelectorAll("[data-comment-id]").forEach(function (button) {
                button.addEventListener("click", function () {
                    var commentId = Number(button.getAttribute("data-comment-id"));
                    var nextData = loadData();
                    nextData.comments = nextData.comments.filter(function (comment) {
                        return !(comment.id === commentId && comment.email === user.email);
                    });
                    saveData(nextData);
                    showNotice("Yorum silindi.", "success");
                    renderComments();
                });
            });
        }

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            var formData = new FormData(form);
            var yorum = String(formData.get("yorum") || "").trim();

            if (!yorum) {
                return;
            }

            var data = loadData();
            data.comments.push({
                id: data.nextCommentId++,
                email: user.email,
                kullanici_adi: user.kullanici_adi,
                yorum: yorum,
                createdAt: new Date().toISOString()
            });
            saveData(data);
            form.reset();
            showNotice("Yorum kaydedildi.", "success");
            renderComments();
        });

        renderComments();
    }

    function initHome() {
        var user = getCurrentUser();
        if (user) {
            redirect("welcome.html");
        }
    }

    function route() {
        attachLinkHandlers();
        consumeFlashNotice();

        var page = document.body.getAttribute("data-page");
        switch (page) {
            case "index":
                initHome();
                break;
            case "login":
                initLogin();
                break;
            case "register":
                initRegister();
                break;
            case "welcome":
                initWelcome();
                break;
            case "profil":
                initProfil();
                break;
            case "edit-username":
                initEditUsername();
                break;
            case "edit-password":
                initEditPassword();
                break;
            case "skorlar":
                initScores();
                break;
            case "yorumlar":
                initComments();
                break;
            default:
                break;
        }
    }

    route();
})();