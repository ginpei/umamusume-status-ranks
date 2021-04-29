import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createRaceEntry, RaceEntry } from "../../../data/RaceEntry";
import { auth, db } from "../../../gp-firebase/firebase";
import { BasicLayout } from "../basicLayout/BasicLayout";
import { registerPagePath } from "../register/RegisterPage";
import { RaceEntryList } from "./RaceEntryList";

const entries: RaceEntry[] = [
  createRaceEntry({
    id: "dummy-1",
    raceTitle: "有馬記念",
    tadunaComment: "平均的",
    speedRank: "great",
    speedStatus: 664,
    staminaRank: "great",
    staminaStatus: 701,
    powerRank: "poor",
    powerStatus: 353,
    gutRank: "poor",
    gutStatus: 336,
    intelligenceRank: "poor",
    intelligenceStatus: 433,
    voteRank: 5,
    expectations: ["maybe", "possibly", "none"],
    commentatorComment: "これ以上ない仕上がり",
  }),
  createRaceEntry({
    id: "dummy-2",
    raceTitle: "ジャパンカップ",
    tadunaComment: "有力",
    speedRank: "great",
    staminaRank: "great",
    powerRank: "poor",
    gutRank: "ok",
    intelligenceRank: "good",
    speedStatus: 656,
    staminaStatus: 701,
    powerStatus: 353,
    gutStatus: 336,
    intelligenceStatus: 443,
    voteRank: 2,
    expectations: ["great", "great", "maybe"],
    commentatorComment: "素質は負けていません",
  }),
];

export const HomePage: React.FC = () => {
  return (
    <BasicLayout>
      <h1>HomePage</h1>
      <TryFirebase />
      <p>
        <Link to={registerPagePath()}>追加</Link>
      </p>
      <RaceEntryList entries={entries} />
    </BasicLayout>
  );
};

const TryFirebase: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const onLoginClick = async () => {
    const email = "test@example.com";
    const password = "123456";
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Failed to log in", error);
    }
  };

  const onLogoutClick = async () => {
    await auth.signOut();
  };

  const onAddClick = async () => {
    const message = window.prompt(
      "コメント",
      `やあ ${new Date().toLocaleTimeString()}`
    );
    if (!message) {
      return;
    }

    db.collection("messages").add({ createdAt: Date.now(), message });
  };

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      console.log("# user", user);
    });
  }, []);

  useEffect(() => {
    return db.collection("messages").onSnapshot((ss) => {
      const newMessages = ss.docs.map((v) => v.data().message);
      setMessages(newMessages);
    });
  }, []);

  return (
    <div className="TryFirebase">
      <p>
        <button onClick={onLoginClick}>ログイン</button>
        <button onClick={onLogoutClick}>ログアウト</button>
      </p>
      <p>
        <button onClick={onAddClick}>コメント追加</button>
      </p>
      <ul>
        {messages.map((message) => (
          <li>{message}</li>
        ))}
      </ul>
    </div>
  );
};
