import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseURL";

export const getModalidadesAction = createAsyncThunk('modalidades/carregar',
async (_, { rejectWithValue, getState, dispatch }) => {
    try {
        //http call
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const url = `${baseUrl}/modalidades`
        const { data } = await axios.get(
            url,
            config
        )
        return data;
    } catch (err) {
        if(!err?.response) {
            throw err;
        };
        return rejectWithValue(err?.response?.data);
    }
});

export const umaModalidadeAction = createAsyncThunk('modalidades/umaModadalidade',
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            //http call
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            };
            const url = `${baseUrl}/modalidades/modalidade/${id}`
            const { data } = await axios.get(
                url,
                config
            )
            
            return data;
        } catch (err) {
            if(!err?.response) {
                throw err;
            };
            return rejectWithValue(err?.response?.data);
        }
});

export const mudarModalidadeAction = createAsyncThunk('modalidades/mudarModadalidade',
    async (requisicao, { rejectWithValue, getState, dispatch }) => {

        const alunos = getState()?.alunos;
        const { alunoLogado } = alunos;
        try {
            //http call
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + alunoLogado?.token
                }
            };
            const url = `${baseUrl}/alunos/mudarModalidade`
            const { data } = await axios.put(
                url,
                requisicao,
                config
            )
            return data;
        } catch (err) {
            if(!err?.response) {
                throw err;
            };
            return rejectWithValue(err?.response?.data);
        }
});

const modalidadeSlices = createSlice({
    name: 'modalidades',
    initialState: {
        modalidades: []
    },
    extraReducers: (builder) => {
        //getModalidades
        builder.addCase(getModalidadesAction.pending, (state, action) => {
            state.loading = true; 
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(getModalidadesAction.fulfilled, (state, action) => {
            state.loading = false; 
            state.modalidades = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(getModalidadesAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
          //uma Modalidade
          builder.addCase(umaModalidadeAction.pending, (state, action) => {
            state.loading = true; 
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(umaModalidadeAction.fulfilled, (state, action) => {
            state.loading = false; 
            state.modalidadeEspecifica = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(umaModalidadeAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //mudar Modalidade
        builder.addCase(mudarModalidadeAction.pending, (state, action) => {
            state.loading = true; 
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(mudarModalidadeAction.fulfilled, (state, action) => {
            state.loading = false; 
            state.modalidadeAlterada = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(mudarModalidadeAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
     }
});

export default modalidadeSlices.reducer;
   