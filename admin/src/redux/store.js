import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import { 
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'user',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ]
            },
        }),
});

 export const persistor = persistStore(store);