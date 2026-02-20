import React from "react";

import {Alert, Button, Input} from "antd";
import {CloseOutlined} from "@ant-design/icons";

export default function App() {
  //Массив тасков
  const [value, setValue] = React.useState(() => {
    const savedItems = localStorage.getItem("task");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const maxTask = 5;

  const [input, setInput] = React.useState("");
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem("task", JSON.stringify(value));
  }, [value]);

  const addTask = () => {
    if (input.trim()) {
      setValue([...value, input]);
      setInput("");
      setError(false);
    } else {
      setError(true);
    }
  };
  const addTaskOnKey = (e) => {
    if (e.key === "Enter") {
      if (input.trim()) {
        setValue([...value, input]);
        setInput("");
        setError(false);
      } else {
        setError(true);
      }
    }
  };

  const deleteTask = (task) => {
    setValue(value.filter((_, index) => index !== task));
  };

  return (
    <main className="absolute inset-0 top-24 w-75 flex flex-col justify-center text-center gap-y-4 left-[50%] -translate-x-1/2 px-2">
      <h1 className="font-semibold text-2xl">
        To do list {value.length}/{maxTask}
      </h1>

      {error && (
        <Alert
          title="Введите текст в поле ввода"
          type="error"
          style={{
            height: "30px",
            fontSize: "13px",
            borderRadius: "8px",
            color: "#B22222",
          }}
        />
      )}

      <Input
        maxLength="30"
        placeholder={
          value.length >= maxTask
            ? `Лимит ${maxTask} задач достигнут`
            : "Введите текст"
        }
        disabled={value.length >= maxTask}
        style={{ borderRadius: "8px" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={addTaskOnKey}
      />
      <Button
        type="primary"
        disabled={value.length >= maxTask}
        onClick={addTask}
        style={{ fontSize: "13px", borderRadius: "8px" }}
      >
        Добавить
      </Button>

      <div className="flex flex-col flex-1 gap-y-2 max-h-[calc(100%-150px)]">
        {value.length > 0 ? (
          value.slice(0, maxTask).map((task, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 px-3 bg-[#f5f5f5] rounded-lg font-medium"
            >
              <p className="text-[12px] first-letter:uppercase text-limit">{task}</p>
              <span
                className="transition duration-300 ease hover:text-[#B22222] cursor-pointer"
                onClick={() => deleteTask(index)}
              >
                <CloseOutlined />
              </span>
            </div>
          ))
        ) : (
          <p className="text-[12px]">Нет задач</p>
        )}
      </div>
    </main>
  );
}
