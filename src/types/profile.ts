export interface ProfileProps {
    userId: string;
    name: string;
    gender?: Gender;
    birthDay?: string;
    prefecture?: number;  // 都道府県コードから文字に入れ替え
    learnLanguage: LearnStatus[];
    nativeLanguage: string[]; // "ja", "en", "zh" など（ISO 639-1）
}


type Gender = "male" | "female" | "other"

// 学習言語のステータス型
interface LearnStatus {
    language: string   // "ja", "en", "zh" など（ISO 639-1）
    level: LanguageLevel
}

// 学習言語の習得レベル
type LanguageLevel = "beginner" | "intermediate" | "advanced"
