import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);
    const goLogin = () => navigate('/login');

    return (
        <section>
            <h1>현재 승인 대기중입니다</h1>
            <br />
            <p>요청하신 페이지에 접근하실 수 없습니다.</p>
            <div className="flexGrow">
                <button onClick={goBack}>이전 페이지</button>
                <button onClick={goLogin}>로그인</button>
            </div>
        </section>
    )
}

export default Unauthorized