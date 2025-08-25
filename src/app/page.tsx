import Link from "next/link";
import {WordGroupCard} from "@/ui/WordGroupCard";
import {IWordGroup} from "@/types";
import {SearchGroups} from "@/ui/SearchGroups";

export default function Home() {
    const wordGroups: IWordGroup[] = [
        {
            id: "1",
            name: "Слова c threads",
            words: [
                { id: "1", en: "Reliable", ua: "надійний" },
                { id: '2', en: "Efficient", ua: "ефективний" },
                { id: '3', en: "Ambitious", ua: "амбітний" },
                { id: '4', en: "Generous", ua: "щедрий" },
                { id: '5', en: "Suspicious", ua: "підозрілий" },
                { id: '6', en: "Cautious", ua: "обережний" },
                { id: '7', en: "Considerate", ua: "турботливий" },
                { id: '8', en: "Impressive", ua: "вражаючий" }
            ]
        },
        {
            id: "2",
            name: "IT слова за 2 серпня",
            words: [
                { id: "1", en: "discuss", ua: "обговорювати" },
                { id: "2", en: "organize", ua: "організовувати" },
                { id: "3", en: "repair", ua: "ремонтувати" },
                { id: "4", en: "deliver", ua: "доставляти" },
                { id: "5", en: "install", ua: "встановлювати" },
                { id: "6", en: "practice", ua: "практикувати" },
                { id: "7", en: "debug", ua: "налагоджувати" },
                { id: "8", en: "monitor", ua: "моніторити" }
            ]
        },
        {
            id: "3",
            name: "Просто слова для 3ї групи",
            words: [
                { id: "1", en: "plan", ua: "планувати" },
                { id: "2", en: "intend", ua: "мати намір" },
                { id: "3", en: "decide", ua: "вирішувати" },
                { id: "4", en: "promise", ua: "обіцяти" },
                { id: "5", en: "expect", ua: "очікувати" },
                { id: "6", en: "hope", ua: "сподіватися" }
            ]
        }
    ];

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
          <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                  <SearchGroups />
                  <Link
                      href="/groups/create"
                      className="flex items-center space-x-2 bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-3 rounded-xl font-medium hover:from-green-500 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Створити групу</span>
                  </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {wordGroups.map((group) => (
                      <WordGroupCard key={group.id} group={group} />
                  ))}
              </div>
          </div>
      </div>
  );
}
