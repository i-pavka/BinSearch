import React, {useEffect, useState} from 'react';
import s from "../App.module.css";
import {SuperRange} from "../common/copmponents/SuperRange/SuperRange";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
  changeCurrentValueAC,
  InitialStateType,
  setLoadingAC,
  setNumberTriesAC,
} from "../../bll/redusers/game-reducer";
import {useGameSelector} from "../../bll/store";
import {Button} from '../common/copmponents/Button/Button';
import {MiniSpinner} from "../common/copmponents/MiniSpinner/MiniSpinner";


export const Launch = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    minValue,
    maxValue,
    isLoading,
  } = useGameSelector<InitialStateType>(state => state.game);
  const [value, setValue] = useState(500);
  const [tries, setTries] = useState(0);


  useEffect(() => {
    setLoading();
  }, []);

  const setLoading = () => {
    dispatch(setLoadingAC(true));

    setTimeout(() => {
      setTries(Math.ceil(Math.log2(value)) + 1);
      dispatch(setLoadingAC(false));
    }, 1000);
  };

  const goHandler = () => {
    navigate('/game');
    dispatch(changeCurrentValueAC(value));
    dispatch(setNumberTriesAC(tries));
  }

  // console.log(tries)

  return (
    <div className={s.mainBlock}>
      <div className={s.textBlock}>
        <h2>Загадай число от 0 до 500, или задай другой диапазон.</h2>
      </div>
      <SuperRange value={value}
                  onChangeRange={setValue}
                  completeChanges={setLoading}
                  min={minValue}
                  max={maxValue}
      />
      <div className={s.triesBlock}>
        <h3>Угадаю максимум за:</h3>
        {isLoading ? <MiniSpinner/> : <h3>{tries} попыток</h3>}
      </div>
      <div>
        <Button disabled={isLoading} onClick={goHandler}>Старт</Button>
      </div>
    </div>
  );
};

