import styles from "./Qna.module.css"

import QnaText1 from "../component/QnaComponent/QnaText1"
import QnaText2 from "../component/QnaComponent/QnaText2"

export default function Qna() {
    return (
        <div className={styles.wrapper}>
            <div className="max-w-[1500px] mx-auto">
                <QnaText1 />

                <p className="w-[100%] h-[1px] bg-[#333333] mt-10 mb-15"></p>

                <QnaText2 />
            </div>
        </div>
    )
}