import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";
import type { Member } from "../types/member";

interface SettleContextType {
    members: Member[];
    setMembers: Dispatch<SetStateAction<Member[]>>;
}

const SettleContext = createContext<SettleContextType | null>(null);

export function SettlementProvider({ children }: { children: React.ReactNode }) {
    const [members, setMembers] = useState<Member[]>([]);

    return (
        <SettleContext.Provider value={{ members, setMembers }}>
            {children}
        </SettleContext.Provider>
    )
}

export function useSettlement() {
    const context = useContext(SettleContext);
    if (!context) {
        throw new Error("useSettlement must be used within SettlementProvider");
    }
    return context;
}