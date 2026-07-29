import { useState, type CSSProperties } from "react";
import { useSettlement } from "../context/SettleContext";
import type { ExpenseInfo } from "../types/expenses";
import "../style/ExpensesPage.css";

const PLACE_EMOJIS = ["📍", "🍖", "🍔", "🍗", "🍺", "🍷", "☕", "🍜", "🍕", "🍣", "🍰", "🍙", "🎤", "🍿","🚕"];

export default function ExpensesPage() {
    const { members } = useSettlement();

    const [expenses, setExpenses] = useState<ExpenseInfo[]>(() => []);

    const [isAdding, setIsAdding] = useState(false);
    const [placeName, setPlaceName] = useState("");
    const [placeEmoji, setPlaceEmoji] = useState(PLACE_EMOJIS[0]);
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const [amountInput, setAmountInput] = useState("");
    const [participantIds, setParticipantIds] = useState<string[]>([]);

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const amount = Number(amountInput) || 0;
    const perPerson = participantIds.length > 0 ? Math.round(amount / participantIds.length) : 0;

    function toggleParticipant(id: string) {
        setParticipantIds((prev) =>
            prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
        );
    }

    function resetForm() {
        setIsAdding(false);
        setPlaceName("");
        setPlaceEmoji(PLACE_EMOJIS[0]);
        setIsEmojiPickerOpen(false);
        setAmountInput("");
        setParticipantIds([]);
    }

    function addExpense() {
        const name = placeName.trim();
        if (!name || amount <= 0 || participantIds.length === 0) {
            return;
        }

        setExpenses((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                order: prev.length + 1,
                emoji: placeEmoji,
                place: name,
                amount,
                participantIds: participantIds,
            },
        ]);
        resetForm();
    }

    // Render
    const renderExpense = (expense: ExpenseInfo) => {
      const participantEmojis = expense.participantIds
          .map((id) => members.find((member) => member.id === id)?.emoji)
          .filter((emoji): emoji is string => Boolean(emoji));

      return (
          <li key={expense.id} className="expenses-item">
              <span className="expenses-item-dot" aria-hidden />
              <span className="expenses-item-order">{expense.order}차</span>
              <div className="expenses-item-name">
                  <span className="expenses-item-emoji">{expense.emoji}</span>
                  <span>{expense.place}</span>
              </div>
              <div className="expenses-item-meta">
                  {expense.amount.toLocaleString()}원 · {participantEmojis.join(" ")}{" "}
                  {expense.participantIds.length}명
              </div>
          </li>
      );
    }

    const renderAddExpense = () => {
      return <>
          <li className="expenses-add expenses-add-form">
              <span className="expenses-item-dot" aria-hidden />
              <div className="expenses-add-header">
                  <span className="expenses-add-label">
                      {expenses.length + 1}차 · 새 장소
                  </span>
                  <button
                      type="button"
                      className="expenses-add-cancel"
                      onClick={resetForm}
                  >
                      취소
                  </button>
              </div>
              <div className="expenses-name-row">
                  <div className="expenses-emoji-select">
                      <button
                          type="button"
                          className="expenses-emoji-current"
                          onClick={() => setIsEmojiPickerOpen((prev) => !prev)}
                      >
                          {placeEmoji}
                      </button>
                      {isEmojiPickerOpen && (
                          <div className="expenses-emoji-dropdown">
                              {PLACE_EMOJIS.map((emoji) => (
                                  <button
                                      key={emoji}
                                      type="button"
                                      className={`expenses-emoji-option${
                                          placeEmoji === emoji ? " selected" : ""
                                      }`}
                                      onClick={() => {
                                          setPlaceEmoji(emoji);
                                          setIsEmojiPickerOpen(false);
                                      }}
                                  >
                                      {emoji}
                                  </button>
                              ))}
                          </div>
                      )}
                  </div>
                  <input
                      className="expenses-name-input"
                      type="text"
                      placeholder="어디였어? 예: 음식점"
                      value={placeName}
                      onChange={(e) => setPlaceName(e.target.value)}
                      onFocus={() => setIsEmojiPickerOpen(false)}
                  />
              </div>
              <div className="expenses-amount-row">
                  <input
                      className="expenses-amount-input"
                      type="text"
                      inputMode="numeric"
                      placeholder="0"
                      value={amountInput === "" ? "" : amount.toLocaleString()}
                      onChange={(e) =>
                          setAmountInput(e.target.value.replace(/[^0-9]/g, ""))
                      }
                  />
                  <span className="expenses-amount-unit">원</span>
              </div>
              <p className="expenses-section-label">누가 참여했어?</p>
              <div className="expenses-participants">
                  {members.map((member) => {
                      const selected = participantIds.includes(member.id);
                      return (
                          <button
                              key={member.id}
                              type="button"
                              className={`expenses-participant-chip${
                                  selected ? " selected" : ""
                              }`}
                              style={
                                  {
                                      "--chip-bg-light": member.lightColor,
                                      "--chip-bg-dark": member.color,
                                  } as CSSProperties
                              }
                              onClick={() => toggleParticipant(member.id)}
                          >
                              <span className="expenses-participant-emoji">
                                  {member.emoji}
                              </span>
                              <span>{member.name}</span>
                          </button>
                      );
                  })}
              </div>
              {participantIds.length > 0 && (
                  <p className="expenses-split-info">
                      {participantIds.length}명이 나눠 내면 1인당{" "}
                      <span className="expenses-split-amount">
                          {perPerson.toLocaleString()}원
                      </span>
                  </p>
              )}
              <button
                  type="button"
                  className="expenses-add-submit"
                  disabled={!placeName.trim() || amount <= 0 || participantIds.length === 0}
                  onClick={addExpense}
                  aria-label="장소 추가하기"
              >
                  +
              </button>
          </li>
          <li className="expenses-next-placeholder">
              <span className="expenses-add-dot" aria-hidden />
              다음 장소는 여기에
          </li>
      </>
    }

    const renderAddExpenseButton = () => {
      return <li className="expenses-add">
          <span className="expenses-add-dot" aria-hidden />
          <button
              type="button"
              className="expenses-add-btn"
              onClick={() => {
                  setParticipantIds(members.map((member) => member.id));
                  setIsAdding(true);
              }}
          >
              + 다음 장소 추가하기
          </button>
      </li>
    }

    return (
        <div className="expenses-page">
            <div className="expenses-card">
                <h1 className="expenses-title">정산 코스</h1>
                <p className="expenses-subtitle">
                    총 {total.toLocaleString()}원 · {expenses.length}군데
                </p>
                <ul className="expenses-list">
                    {expenses.map((expense) => renderExpense(expense))}
                    {isAdding ? renderAddExpense() : renderAddExpenseButton()}
                </ul>
                <button type="button" className="expenses-settle-btn">
                    정산 결과 보기
                </button>
            </div>
        </div>
    );
}
