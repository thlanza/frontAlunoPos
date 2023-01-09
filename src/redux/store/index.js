import { configureStore } from "@reduxjs/toolkit";
import modalidadeReducer from '../slices/modalidades/modalidadeSlices';
import alunosReducer from '../slices/alunos/alunosSlices';

const store = configureStore({
    reducer: {
        modalidades: modalidadeReducer,
        alunos: alunosReducer
    }
});

export default store;