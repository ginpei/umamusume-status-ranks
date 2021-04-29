import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { RaceEntry, RaceEntryCallback } from "../../../data/RaceEntry";
import { InputField } from "../../stable/InputField";
import styles from "./StatusInput.module.scss";

export const StatusInput: React.FC<{
  entry: RaceEntry;
  onChange: RaceEntryCallback;
}> = ({ entry, onChange }) => {
  const [editing, setEditing] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const refEditor = useRef<HTMLTextAreaElement>(null);

  const onClick = () => {
    const newContent = [
      entry.speedStatus,
      entry.staminaStatus,
      entry.powerStatus,
      entry.gutStatus,
      entry.intelligenceStatus,
    ].join("\n");
    setEditorContent(newContent);

    setEditing(true);
  };

  const onBlur = () => {
    const [
      speedStatus = 0,
      staminaStatus = 0,
      powerStatus = 0,
      gutStatus = 0,
      intelligenceStatus = 0,
    ] = editorContent.split("\n").map((v) => Number(v));

    onChange({
      ...entry,
      speedStatus,
      staminaStatus,
      powerStatus,
      gutStatus,
      intelligenceStatus,
    });

    setEditing(false);
  };

  const onEdit: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const { value } = event.currentTarget;
    setEditorContent(value);
  };

  useEffect(() => {
    if (!refEditor.current) {
      return;
    }

    refEditor.current.select();
  }, [editing, refEditor.current]);

  if (editing) {
    return (
      <InputField title="ステータス（1行ずつ）">
        <textarea
          className={styles.editor}
          onBlur={onBlur}
          onChange={onEdit}
          ref={refEditor}
          value={editorContent}
        />
      </InputField>
    );
  }

  return (
    <div className={styles.root} onClick={onClick} tabIndex={0}>
      <span className={styles.status}>{entry.speedStatus}</span>
      <span className={styles.status}>{entry.staminaStatus}</span>
      <span className={styles.status}>{entry.powerStatus}</span>
      <span className={styles.status}>{entry.gutStatus}</span>
      <span className={styles.status}>{entry.intelligenceStatus}</span>
    </div>
  );
};
