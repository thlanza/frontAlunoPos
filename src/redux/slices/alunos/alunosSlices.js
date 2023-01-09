import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseURL";

export const matricularAction = createAsyncThunk('alunos/matricular',
    async (usuario, { rejectWithValue, getState, dispatch }) => {
        try {
            //http call
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            };
            const url = `${baseUrl}/alunos/matricular`
            const { data } = await axios.post(
                url,
                usuario,
                config
            );
            //salvar usuário no localStorage
            localStorage.setItem('infoAluno', JSON.stringify(data));
            return data;
        } catch (err) {
            if(!err?.response) {
                throw err;
            };
            return rejectWithValue(err?.response?.data);
        }
});

export const matricularGoogleAction = createAsyncThunk('alunos/matricularGoogle',
    async (usuario, { rejectWithValue, getState, dispatch }) => {
        try {
            //http call
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            };
            const url = `${baseUrl}/alunos/matricularGoogle`
            const { data } = await axios.post(
                url,
                usuario,
                config
            );
            //salvar usuário no localStorage
            localStorage.setItem('infoAluno', JSON.stringify(data));
            return data;
        } catch (err) {
            if(!err?.response) {
                throw err;
            };
            return rejectWithValue(err?.response?.data);
        }
});

export const logarAction = createAsyncThunk('alunos/logar',
    async (usuario, { rejectWithValue, getState, dispatch }) => {
        try {
            //http call
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            };
            const url = `${baseUrl}/alunos/logar`
            const { data } = await axios.post(
                url,
                usuario,
                config
            );
            //salvar usuário no localStorage
            localStorage.setItem('infoAluno', JSON.stringify(data));
            return data;
        } catch (err) {
            if(!err?.response) {
                throw err;
            };
            return rejectWithValue(err?.response?.data);
        }
});

//pegar aluno do localStorage e colocar na store
const alunoMatriculadoLocalStorage = 
    localStorage.getItem('infoAluno') ?
    JSON.parse(localStorage.getItem('infoAluno')) :
    null;

const alunosSlices = createSlice({
    name: 'alunos',
    initialState: {
        alunoLogado: alunoMatriculadoLocalStorage
    },
    extraReducers: (builder) => {
        //matricular
        builder.addCase(matricularAction.pending, (state, action) => {
            state.loading = true; 
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(matricularAction.fulfilled, (state, action) => {
            state.loading = false;
            state.alunoLogado = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(matricularAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //matricularGoogle
        builder.addCase(matricularGoogleAction.pending, (state, action) => {
            state.loading = true; 
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(matricularGoogleAction.fulfilled, (state, action) => {
            state.loading = false;
            state.alunoLogado = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(matricularGoogleAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //logar
        builder.addCase(logarAction.pending, (state, action) => {
            state.loading = true; 
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(logarAction.fulfilled, (state, action) => {
            state.loading = false;
            state.alunoLogado = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(logarAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
    }
});

export default alunosSlices.reducer;