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

export const uploadComprovanteAction = createAsyncThunk('alunos/uploadComprovanteAction',
    async (comprovante, { rejectWithValue, getState, dispatch }) => {
        try {
            //http call

            const alunos = getState()?.alunos;
            const { alunoLogado } = alunos;
            //http call
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: 'Bearer ' + alunoLogado?.token
                }
            };
            const url = `${baseUrl}/alunos/comprovante`
            const { data } = await axios.post(
                url,
                comprovante,
                config
            );
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
            //deletar se houver
            localStorage.removeItem('infoAluno')
            localStorage.setItem('infoAluno', JSON.stringify(data));
            return data;
        } catch (err) {
            if(!err?.response) {
                throw err;
            };
            return rejectWithValue(err?.response?.data);
        }
});

//logout
export const logoutAction = createAsyncThunk('alunos/logout',
    async (_, { rejectWithValue, getState, dispatch }) => {
        try {
            localStorage.removeItem('infoAluno');
        } catch (err) {
            if(!err?.response) {
                throw err;
            };
            return rejectWithValue(err?.response?.data);
        }
});

//notificar a lista de presença
export const notificarListaPresencaAction = createAsyncThunk('aluno/notificarListaPresenca',
        async (presenca, { rejectWithValue, getState, dispatch }) => {
            try {
                //http call
                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
                const url = `${baseUrl}/alunos/notificarPresenca`;
                const { data } = await axios.post(
                    url,
                    presenca,
                    config
                );
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
    reducers: {
        resetErro(state) {
            state.appErr = undefined;
            state.serverErr = undefined;
        }
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
        //logout
        builder.addCase(logoutAction.pending, (state, action) => {
            state.loading = true; 
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(logoutAction.fulfilled, (state, action) => {
            state.loading = false;
            state.alunoLogado = undefined;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(logoutAction.rejected, (state, action) => {
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
        //notificar Presença
        builder.addCase(notificarListaPresencaAction.pending, (state, action) => {
            state.loading = true; 
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(notificarListaPresencaAction.fulfilled, (state, action) => {
            state.loading = false;
            state.listaAtualizada = action.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(notificarListaPresencaAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //notificar Pagamento
        builder.addCase(uploadComprovanteAction.pending, (state, action) => {
            state.loading = true; 
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(uploadComprovanteAction.fulfilled, (state, action) => {
            state.loading = false;
            state.comprovante = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(uploadComprovanteAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
    }
});

export default alunosSlices.reducer;

export const { resetErro } = alunosSlices.actions;