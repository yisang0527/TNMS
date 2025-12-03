import {Link} from "react-router-dom";

export default function Header(){
    return(
        <>
        <ul class="mom">
            <li><Link to="/">지난재난통계</Link>
                <ul class="son">
                    <li><Link to="/">지난재난통계</Link></li>
                </ul>
            </li>
            <li><Link to="/">재난예방대비</Link></li>
                <ul class="son">
                    <li><Link to="/">자연재난행동요령</Link></li>
                    <li><Link to="/">비상연락망</Link></li>
                </ul>
            <li><Link to="/">재난심리상담</Link>
                <ul class="son">
                    <li><Link to="/">재난심리센터소개</Link></li>
                    <li><Link to="/">재난심리상담</Link></li>
                    <li><Link to="/">재난심리자가진단</Link></li>
                </ul>
            </li>
            <li><Link to="/">참여와신고</Link>
                <ul class="son"> 
                    <li><Link to="/">Q&A</Link></li>
                    <li><Link to="/">재난신고하기</Link></li>
                    <li><Link to="/">공지사항</Link></li>
                </ul>
            </li>
        </ul>
        </>
    )

}