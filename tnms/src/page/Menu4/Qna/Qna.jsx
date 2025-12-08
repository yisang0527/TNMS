import styles from "../../../css/Menu4/Qna/Qna.module.css"

import QnaText1 from "../../../component/Menu4/Qna/QnaText1"
import QnaText2 from "../../../component/Menu4/Qna/QnaText2"

export default function Qna() {
    return (
        <div className={styles.wrapper}>
            <div className="max-w-[1500px] mx-auto pt-[100px] pb-[200px]">
                <QnaText1 />

                <p className="w-[100%] h-[1px] bg-[#333333] mt-10 mb-15"></p>

                <QnaText2 />
            </div>
        </div>
    )
}