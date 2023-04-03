import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";

// Export hook variables that have the right TS types
// In our components, we import these hooks instead of importing the base functions from react-redux

export const useAppDispatch = useDispatch<AppDispatch>;
//Aliasing useSelector(function) and add our types to it
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
