// Notice.jsx

import styles from "../../../css/Menu4/Notice/Notice.module.css";

import NoticeText from "../../../component/Menu4/Notice/NoticeText";

export default function Notice() {
    return (
        <div className={styles.wrapper}>
            <div className="max-w-[1500px] mx-auto pt-[100px] pb-[200px]">
                <NoticeText />
            </div>
        </div>
    )
}