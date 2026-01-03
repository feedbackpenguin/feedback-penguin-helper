chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "watchForInfo") {
        const {
            lessonTitle,
            classCode,
            studentProgram,
        } = message;

        const listener = (tabId, changeInfo, tab) => {
            if (
                changeInfo.status === "complete" &&
                tab.url &&
                tab.url.includes("/tp/preparation/student")
            ) {
                const url = new URL(tab.url);
                const studentId = url.searchParams.get("studentId");
                const onlineClassId = url.searchParams.get("onlineClassId");
                const scheduledDateTime = url.searchParams.get("scheduledDateTime");
                const serialNumber = url.searchParams.get("serialNumber") || classCode;

                chrome.scripting.executeScript(
                    {
                        target: { tabId },
                        func: () => {
                            return new Promise((resolve) => {
                                const timeout = 10000;
                                const start = Date.now();

                                const check = () => {
                                    const nameEl = document.querySelector(".name-and-sex .value");
                                    const birthdayEl = document.querySelector(".birthday-and-year .value");
                                    const maleEl = document.querySelector("div.male");
                                    const femaleEl = document.querySelector("div.female");

                                    const studentName = nameEl?.textContent?.trim() || null;
                                    const birthday = birthdayEl?.textContent?.trim() || null;

                                    let gender = "MALE";
                                    if (femaleEl) gender = "FEMALE";

                                    const foundGender = !!(maleEl || femaleEl);
                                    const allFound = studentName && birthday && foundGender;

                                    if (allFound) resolve({ studentName, birthday, gender });
                                    else if (Date.now() - start > timeout)
                                        resolve({ studentName, birthday, gender });
                                    else setTimeout(check, 150);
                                };

                                check();
                            });
                        },
                    },
                    (results) => {
                        if (!results || !results[0]) return;

                        const { studentName, birthday, gender } = results[0].result || {};

                        const feedbackUrl =
                            `https://feedbackpenguin.io/dashboard/` +
                            `?classCode=${encodeURIComponent(serialNumber)}` +
                            `&studentName=${encodeURIComponent(studentName || "")}` +
                            `&gender=${encodeURIComponent(gender)}` +
                            `&studentId=${encodeURIComponent(studentId)}` +
                            `&onlineClassId=${encodeURIComponent(onlineClassId)}` +
                            `&scheduledDateTime=${encodeURIComponent(scheduledDateTime)}` +
                            `&birthday=${encodeURIComponent(birthday || "")}` +
                            `&lessonTitle=${encodeURIComponent(lessonTitle)}` +
                            `&studentProgram=${encodeURIComponent(studentProgram || "")}` +
                            `&openClassModal=true`;

                        chrome.tabs.update(tabId, { url: feedbackUrl });
                        chrome.tabs.onUpdated.removeListener(listener);
                    }
                );
            }
        };

        chrome.tabs.onUpdated.addListener(listener);
    }
});
