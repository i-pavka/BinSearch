import React, {useEffect, useRef, useState} from 'react';
import CountUp from 'react-countup';
import {useGameSelector} from "../../bll/store";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import s from './ProcessGame.module.css'
import sApp from '../App.module.css'
import {Button} from "../common/copmponents/Button/Button";
import {InitialStateType, setLoadingAC} from "../../bll/redusers/game-reducer";

const calculateVariant = (min: number[], max: number[]) => {
  return Math.floor((min[min.length - 1] + max[max.length - 1]) / 2)
}

export const ProcessGame = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    numberTries,
    currentValue,
    isLoading,
  } = useGameSelector<InitialStateType>(state => state.game);

  const [countTries, setCountTries] = useState(1);
  const [variant, setVariant] = useState(0);
  const [initTries, setInitTries] = useState(numberTries);
  const [showResult, setShowResult] = useState(false);

  const setLoading = () => {
    dispatch(setLoadingAC(true));
    setTimeout(() => {
      dispatch(setLoadingAC(false));
    }, 1600);
  };

  useEffect(() => {
    setVariant(calculateVariant(variantMin.current, variantMax.current));
    setLoading();
  }, []);

  useEffect(() => {
    if (initTries < 0) navigate('/launch');
  }, [initTries]);

  useEffect(() => {
    setInitTries((value) => value - 1);
  }, [countTries]);

  const variantMin = useRef<number[]>([1]);
  const variantMax = useRef<number[]>([currentValue]);
  const statistics = useRef<{ id: number, number: number, answer: string }[]>([]);

  const buttonMax = () => {
    setLoading();
    setCountTries(countTries + 1);
    variantMin.current.push(variant)
    setVariant(calculateVariant(variantMin.current, variantMax.current));
    statistics.current.push({id: countTries, number: variant, answer: 'больше'});
  }
  const buttonMin = () => {
    setLoading();
    setCountTries(countTries + 1);
    variantMax.current.push(variant);
    setVariant(calculateVariant(variantMin.current, variantMax.current));
    statistics.current.push({id: countTries, number: variant, answer: 'меньше'});
  }
  const restart = () => {
    navigate('/launch');
  }

  const finish = () => {
    statistics.current.push({id: countTries, number: variant, answer: 'угадал!'});
    setShowResult(!showResult);
  }

  return (
    <div>
      <div className={`${sApp.mainBlock}`}>
        <div className={s.main}>
          <h2>Мой вариант</h2>
          <h1><CountUp delay={0}
                       duration={1.5}
                       start={variantMin.current[variantMin.current.length - 1]}
                       end={variant}
                       className={s.countUp}/>
          </h1>
        </div>
        <div className={s.buttonChoice}>
          <Button disabled={isLoading} onClick={buttonMax}>Больше ↑</Button>
          <Button disabled={isLoading} onClick={buttonMin}>Меньше ↓</Button>
        </div>
        <div>
          <Button disabled={isLoading} purple onClick={finish}>Угадал!</Button>
        </div>
        <div className={s.triesBlock}>
          <h2>Осталось <span className={s.countUp}>{initTries} </span>
            из <span className={s.countUp}>{numberTries}</span> попыток</h2>
          <h2>Заданный максимум <span className={s.countUp}>{currentValue} </span></h2>
        </div>
        <Button disabled={isLoading} red onClick={restart}>Начать заново</Button>
        <div className={`${s.resulBlock} ${showResult ? s.active : ''}`}>
          <h2>Результат</h2>
          <div className={s.tableMainBlock}>
            <table>
              <thead>
              <tr className={s.trStyle}>
                <th>Попытка</th>
                <th>Моё число</th>
                <th>Твой ответ</th>
              </tr>
              </thead>
              <tbody className={s.tbodyStyle}>
              {showResult && statistics.current.map(el => {
                return (
                  <tr key={el.id}>
                    <td>{el.id}</td>
                    <td>{el.number}</td>
                    <td>{el.answer}</td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

