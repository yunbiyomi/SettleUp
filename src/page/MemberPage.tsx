import { useState, type CSSProperties, type FormEvent, type KeyboardEvent } from "react";
import { useNavigate } from "react-router";
import { useSettlement } from "../context/SettleContext";
import { MEMBER_STYLES } from "../types/member";
import "../style/MemberPage.css";

export default function MemberPage() {
    const { members, setMembers } = useSettlement();
    const navigate = useNavigate();
    const [memberName, setMemberName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isComposing, setIsComposing] = useState(false);

    function addMember() {
        const name = memberName.trim();
        if (!name) {
            setErrorMessage("이름을 입력해주세요.");
            return;
        }

        if (members.some((member) => member.name === name)) {
            setErrorMessage("이미 추가된 멤버예요.");
            return;
        }

        const style = MEMBER_STYLES[members.length % MEMBER_STYLES.length];
        setMembers((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                name,
                emoji: style.emoji,
                color: style.color,
                lightColor: style.lightColor,
            },
        ]);
        setMemberName("");
        setErrorMessage("");
    }

    function removeMember(id: string) {
        setMembers((prev) => prev.filter((member) => member.id !== id));
    }

    function resetMembers() {
        setMembers([]);
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        addMember();
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            // IME 문제로 한글 입력 후 엔터 쳤을 때 두 번 추가되는 문제 방지
            if (isComposing || e.nativeEvent.isComposing) {
                return;
            }
            e.preventDefault();
            addMember();
        }
    }

    function goToExpenses() {
        if (members.length === 0) {
            return;
        }
        
        navigate("/expenses");
    }

    return (
        <div className="member-page">
            <div className="member-card">
                <h1 className="member-title">누구누구 모였어?</h1>
                <p className="member-subtitle">정산할 멤버를 추가해줘.</p>
                <form className="member-input-row" onSubmit={handleSubmit}>
                    <input
                        className="member-input"
                        type="text"
                        placeholder="이름 입력"
                        value={memberName}
                        onChange={(e) => {
                            setMemberName(e.target.value);
                            setErrorMessage("");
                        }}
                        onKeyDown={handleKeyDown}
                        onCompositionStart={() => setIsComposing(true)}
                        onCompositionEnd={() => setIsComposing(false)}
                    />
                    <button
                        type="submit"
                        className="member-add-btn"
                        disabled={!memberName.trim()}
                        aria-label="멤버 추가"
                    />
                </form>
                {errorMessage && <p className="member-error">{errorMessage}</p>}
                {members.length > 0 && (
                    <div className="member-chips-header">
                        <button
                            type="button"
                            className="member-reset-btn"
                            onClick={resetMembers}
                        >
                            전체 삭제
                        </button>
                    </div>
                )}
                <ul className="member-chips">
                    {members.map((member) => (
                        <li
                            key={member.id}
                            className="member-chip"
                            style={{
                                "--chip-bg-light": member.lightColor,
                                "--chip-bg-dark": member.color,
                            } as CSSProperties}
                        >
                            <span className="member-chip-emoji">{member.emoji}</span>
                            <span>{member.name}</span>
                            <button
                                type="button"
                                className="member-chip-remove"
                                onClick={() => removeMember(member.id)}
                                aria-label={`${member.name} 삭제`}
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>

                <button
                    type="button"
                    className="member-submit"
                    disabled={members.length === 0}
                    onClick={goToExpenses}
                >
                    {members.length}명이랑 정산하기
                    <span className="member-submit-arrow" aria-hidden>›</span>
                </button>
            </div>
        </div>
    );
}
