import api from './api';

interface LoginParams {
  login: string;
  senha: string;
  tokenAcesso: string;
}

interface SuccessResponse {
  error: false;
  data: {
    id: number;
    nome: string;
    email: string;
  };
}

interface ErrorResponse {
  error: true;
  mensagem: string;
}

type ApiResponse = SuccessResponse | ErrorResponse;

export const AuthService = {
  async login({ login, senha }: Omit<LoginParams, 'tokenAcesso'>): Promise<ApiResponse> {
    try {
      const response = await api.post('/conexao/perfil/acessar', {
        login,
        senha,
        tokenAcesso: 'b10583a254678158a93da0',
      });

      let data = response.data;

      if (typeof data === 'string') {
        try {
          const decodedString = decodeURIComponent(data);
          data = JSON.parse(decodedString);
        } catch (decodeError) {
          console.error('Erro ao decodificar a resposta:', decodeError);
          return {
            error: true,
            mensagem: 'Erro ao processar a resposta do servidor'
          };
        }
      }

      if (data?.error) {
        return {
          error: true,
          mensagem: data.mensagem || 'Credenciais inválidas'
        };
      }

      return {
        error: false,
        data
      };

    } catch (error: any) {
      let errorMessage = 'Erro ao conectar com o servidor';
      if (error.response?.data?.mensagem) {
        errorMessage = error.response.data.mensagem;
      }
      return {
        error: true,
        mensagem: errorMessage
      };
    }
  },

  async recuperarSenha(email: string): Promise<{ error: boolean; mensagem: string }> {
    try {
      const response = await api.post('/conexao/perfil/smsRecuperar', { email });

      let data = response.data;
      console.log('data recuperar senha', data)

      if (typeof data === 'string') {
        try {
          const decodedString = decodeURIComponent(data);
          data = JSON.parse(decodedString);
        } catch (decodeError) {
          return {
            error: true,
            mensagem: 'Erro ao processar a resposta do servidor',
          };
        }
      }

      return {
        error: data?.error ?? true,
        mensagem: data?.mensagem ?? 'Erro desconhecido',
      };
    } catch (error: any) {
      return {
        error: true,
        mensagem: error.response?.data?.mensagem || 'Erro ao conectar com o servidor',
      };
    }
  },

  async validarTokenRecuperacao(email: string, tokenRecuperarSenha: string): Promise<{ error: boolean; mensagem: string }> {
    try {
      const response = await api.post('/conexao/perfil/smsValidar', {
        email,
        tokenRecuperarSenha,
      });

      let data = response.data;

      if (typeof data === 'string') {
        try {
          const decodedString = decodeURIComponent(data);
          data = JSON.parse(decodedString); 0

        } catch (decodeError) {
          return {
            error: true,
            mensagem: 'Erro ao processar a resposta do servidor',
          };
        }
      }

      return {
        error: data?.error ?? true,
        mensagem: data?.mensagem ?? 'Erro desconhecido',
      };
    } catch (error: any) {
      return {
        error: true,
        mensagem: error.response?.data?.mensagem || 'Erro ao conectar com o servidor',
      };
    }
  },

  async modificarSenha(email: string, tokenRecuperarSenha: string, novaSenha: string) {
    try {
      const response = await api.post('/conexao/perfil/modificarSenha', {
        email,
        tokenRecuperarSenha,
        novaSenha,
      });

      console.log('Resposta modificar senha :', response.data)
      return response.data;
    } catch (error) {
      return {
        erro: true,
        mensagem: 'Erro ao modificar a senha',
      };
    }
  }



};