enum ActionsTypes {
  changeMinValue = 'game/CHANGE-MIN-VALUE',
  changeMaxValue = 'game/CHANGE-MAX-VALUE',
  changeCurrentValue = 'game/CHANGE-CURRENT-VALUE',
  setNumberTries = 'game/SET-NUMBER-TRIES',
  setLoading = 'game/SET-LOADING',
}

const initState = {
  minValue: 1,
  maxValue: 1000,
  currentValue: 500,
  numberTries: 1,
  isLoading: false,
}

export type InitialStateType = typeof initState
export const gameReducer = (state: InitialStateType = initState, action: GameActionType): InitialStateType => {
  switch (action.type) {
    case ActionsTypes.changeMinValue:
    case ActionsTypes.changeMaxValue:
    case ActionsTypes.changeCurrentValue:
    case ActionsTypes.setNumberTries:
    case ActionsTypes.setLoading:
      return {...state, ...action.payload}
    default:
      return state
  }
}

// actions
export const changeMinValueAC = (minValue: number) => {
  return {type: ActionsTypes.changeMinValue, payload: {minValue}} as const;
}
export const changeMaxValueAC = (maxValue: number) => {
  return {type: ActionsTypes.changeMaxValue, payload: {maxValue}} as const;
}
export const changeCurrentValueAC = (currentValue: number) => {
  return {type: ActionsTypes.changeCurrentValue, payload: {currentValue}} as const;
}
export const setNumberTriesAC = (numberTries: number) => {
  return {type: ActionsTypes.setNumberTries, payload: {numberTries}} as const;
}
export const setLoadingAC = (isLoading: boolean) => {
  return {type: ActionsTypes.setLoading, payload: {isLoading}} as const;
}
export type GameActionType = ReturnType<typeof changeMinValueAC>
  | ReturnType<typeof changeMaxValueAC>
  | ReturnType<typeof changeCurrentValueAC>
  | ReturnType<typeof setNumberTriesAC>
  | ReturnType<typeof setLoadingAC>
