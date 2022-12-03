import React, { useEffect, useState } from 'react';
import { API } from "../servises/api";
import "./style.css"
import {log} from "util";


function Home() {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLogged, setLogged] = useState(false);
  const [Topics, setTopics] = useState([]);

  useEffect(() => {
    const userRequest = async () => {
      setLogged(false);
      setResult("");
      setError("");
      try {
        const user = await API.user.getCurrentUser();
        setResult(`Привет, ${user.login}`);
        setLogged(true);

        const topics = await API.topic.getAllTopics()

        setTopics(topics)

      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    };
    userRequest();
  }, []);

  const handleLogout = () => {
    const logoutRequest = async () => {
      try {
        await API.auth.logout();
        setLogged(false);
        setResult("");
        window.location.reload();
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    };
    logoutRequest();

  };

  return <>
    {!isLogged && <h2 className="text-sm-center">Зарегистрируйтесь или войдите в аккаунт!</h2>}
    <div className="d-flex justify-content-end mt-2 p-2">
      {result && <div className="fw-bold">{result}</div>}
      {error && <div>{error}</div>}
    </div>

    <div className="d-flex justify-content-end p-1">
      {isLogged && <button className="btn btn-dark fw-bold" onClick={handleLogout}>Разлогиниться</button>}
    </div>

    {isLogged &&
        <main>
          <section className="jokebox">
            <div className="input-group mb-3">
              <span className="input-group-text">Имя преподавателя</span>
              <input type="text" className="form-control" placeholder="Имя преподавателя" aria-label="Username"></input>
            </div>

            <div className="input-group">
              <span className="input-group-text">Цитата</span>
              <textarea className="joketext form-control" placeholder="Цитата" aria-label="With textarea"></textarea>
            </div>

            <div className="d-flex justify-content-center w-100 mt-2"></div>
            <button className="btn btn-success fw-bolder">
              Отправить
            </button>
          </section>
          <section>
            <div className="joke content">
              <figure className="quote">
                <blockquote>
                  Я специально по коридору полчаса болтался, чтобы этот олух списал, так он и списать не смог!
                </blockquote>
                <figcaption>
                  —  Пипич
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-success">[👍]</button>
                    <h3 className="m-2"> 85 </h3>
                    <button className="btn btn-danger">[👎]</button>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div className="joke content">
              <figure className="quote">
                <blockquote>
                  Я вообще работаю в банке, а вки так... подработка для души
                </blockquote>
                <figcaption>
                  — Аксёнов
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-success">[👍]</button>
                    <h3 className="m-2"> -2 </h3>
                    <button className="btn btn-danger">[👎]</button>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div className="joke content">
              <figure className="quote">
                <blockquote>
                  Не ломайте окна, они казённые.
                </blockquote>
                <figcaption>
                  — Клюшова
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-success">[👍]</button>
                    <h3 className="m-2"> 5 </h3>
                    <button className="btn btn-danger">[👎]</button>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div className="joke content">
              <figure className="quote">
                <blockquote>
                  ты зачем мне это по-русски рассказываешь? ты мне это по-питонски расскажи
                </blockquote>
                <figcaption>
                  — Калинина
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-success">[👍]</button>
                    <h3 className="m-2"> 34 </h3>
                    <button className="btn btn-danger">[👎]</button>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div className="joke content">
              <figure className="quote">
                <blockquote>
                  *Группа сидит на паре и ничего не понимает*
                  Студент: «Виталий Юрьевич, а можете объяснить подробнее это выражение?»
                  Препод: «Нуууу… *пупупу* знаете, таков путь»
                  Студент: «Тогда это все объясняет, спасибо»
                </blockquote>
                <figcaption>
                  — Черкашин
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-success">[👍]</button>
                    <h3 className="m-2"> 2 </h3>
                    <button className="btn btn-danger">[👎]</button>
                  </div>
                </figcaption>
              </figure>
            </div>
          </section>

        </main>
    }
    {console.log(Topics)}
  </>;
}

export default Home;
