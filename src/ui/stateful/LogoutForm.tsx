import { useState } from "react";
import { auth } from "../../gp-firebase/firebase";

export const LogoutForm: React.FC = () => {
  const [dirty, setDirty] = useState(false);

  const onClick = async () => {
    setDirty(true);
    await auth.signOut();
  };

  return (
    <div className="LogoutForm">
      <button disabled={dirty} onClick={onClick}>
        ログアウト
      </button>
    </div>
  );
};
