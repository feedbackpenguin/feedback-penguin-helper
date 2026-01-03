function addFeedbackIcons() {
    const isAllTab = window.location.pathname.includes("/all");

    document.querySelectorAll(".vip-table__row").forEach((row) => {
        if (row.querySelector(".feedback-icon")) return;

        const classCode =
            row.querySelector(".course-lessonSN")?.textContent?.trim() || "";

        const lessonTitle =
            row.querySelector(".course-lessonName")?.textContent?.trim() || "";

        const studentProgram = isAllTab
            ? ""
            : row.querySelector(".vip-tag.country-content")?.textContent?.trim() || "";

        const icon = document.createElement("img");
        icon.src = chrome.runtime.getURL("assets/images/penguin.webp");
        icon.title = "FeedbackPenguin";
        icon.className = "feedback-icon";
        icon.style.cursor = "pointer";
        icon.style.marginLeft = "10px";
        icon.style.width = "19px";
        icon.style.height = "auto";

        icon.addEventListener("click", () => {
            const studentLink =
                row.querySelector(".student-click-area") ||
                row.querySelector(".missing-student-name") ||
                row.querySelector(".major-student-name");

            if (!studentLink) {
                alert("FeedbackPenguin: Student link not found.");
                return;
            }

            chrome.runtime.sendMessage({
                action: "watchForInfo",
                lessonTitle,
                classCode,
                studentProgram,
            });

            studentLink.click();
        });

        row.querySelector("td:last-child")?.appendChild(icon);
    });
}

document.addEventListener("DOMContentLoaded", addFeedbackIcons);

const observer = new MutationObserver(addFeedbackIcons);
observer.observe(document.body, { childList: true, subtree: true });