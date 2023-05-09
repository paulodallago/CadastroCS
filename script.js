$(document).ready(function() {

    var jogadores = [];
    if(localStorage.getItem("jogadores") == null){

      localStorage.setItem("jogadores" , JSON.stringify([]));
    }else{
      jogadores = JSON.parse(localStorage.getItem("jogadores"))
    }

    var patentes = [];
    if(localStorage.getItem("patentes") == null){

      localStorage.setItem("patentes" , JSON.stringify([]));

    }else{
      patentes = JSON.parse(localStorage.getItem("patentes"));
    }

    var couples = [];
    if(localStorage.getItem("couples") == null){

      localStorage.setItem("couples" , JSON.stringify([]));

    }else{
       
      couples = JSON.parse(localStorage.getItem("couples"));
    }

    var dados = {
      "jogadores": jogadores, 
      "novo_jogador" : {id: '', name: '', senha: '', dt_cadastro: '', qtd_dinheiro: '', qtd_pontos: '', dt_login: '', situacao: ''}, 
      "patentes": patentes,
      "nova_patente" : {id: '', cod: '', nome: '', cor: '', dt_cria: '', logo: '', qtd_min: ''},
      "couples": couples,
      "novo_couple": {id: '', jogador: '', patente: ''}
    };

    var date = new Date;

    Vue.use(window.vuelidate.default);

    const {
        required,
        minLength,
        maxLength,
        minValue,
        maxValue
    } = window.validators

    Vue.filter('formataData', function (value) {                

      var data = new Date(value);
      data.setDate(data.getDate());             
      dia  = (data.getDate()).toString().padStart(2, '0'),
      mes  = (data.getMonth()+1).toString().padStart(2, '0'),             
      ano  = data.getFullYear();                
      return dia+"/"+mes+"/"+ano;                
    })

    new Vue({ 
      el: '#jogador', 
      data: dados,
      validations: {
          novo_jogador: {
            name: {
                required, 
                maxLength: maxLength(12)
            },
            senha: {
              required,
              minLength: minLength(4)
            },
            qtd_dinheiro: {
              required
            },
            qtd_pontos: {
              required
            },
            situacao: {
              
            }
          }
      },
      methods: { 

        status(validation) {
              return {
                  error: validation.$error,
                  dirty: validation.$dirty
              }
          },

          addJogador: function (v) {

          if(!v.$invalid){

            var jogador_indice = this.novo_jogador.id;
            var jogador_name = this.novo_jogador.name;
            var jogador_senha = this.novo_jogador.senha;
            var jogador_dt_cadastro = date;
            var jogador_qtd_dinheiro = this.novo_jogador.qtd_dinheiro;
            var jogador_qtd_pontos = this.novo_jogador.qtd_pontos;
            var jogador_dt_login = date;
            var jogador_situacao = situacaoBool;

            if(isNaN(parseInt(jogador_indice))){

              console.log(jogador_indice);

              this.jogadores.push({name: jogador_name,
                              senha: jogador_senha,
                              dt_cadastro: jogador_dt_cadastro,
                              qtd_dinheiro: jogador_qtd_dinheiro,
                              qtd_pontos: jogador_qtd_pontos,
                              dt_login: jogador_dt_login,
                              situacao: jogador_situacao}
                              );

              alert('Novo Jogador cadastrado !');

            }else{

              this.jogadores[jogador_indice] = {name: jogador_name,
                              senha: jogador_senha,
                              qtd_dinheiro: jogador_qtd_dinheiro,
                              qtd_pontos: jogador_qtd_pontos,
                              dt_login: jogador_dt_login,
                              situacao: jogador_situacao
                              };

              alert('Jogador alterado !');
            }
            localStorage.setItem("jogadores" , JSON.stringify(this.jogadores));
            this.cleanFormularioJogador();
          } else {

            alert('Formulário incompleto!');
          }
        },

        editJogador: function (param_index) {

            this.novo_jogador.id = param_index;
            this.novo_jogador.name = this.jogadores[param_index].name; 
            this.novo_jogador.senha = this.jogadores[param_index].senha;
            this.novo_jogador.dt_cadastro = this.jogadores[param_index].dt_cadastro;
            this.novo_jogador.qtd_dinheiro = this.jogadores[param_index].qtd_dinheiro;
            this.novo_jogador.qtd_pontos = this.jogadores[param_index].qtd_pontos;
            this.novo_jogador.dt_login = this.jogadores[param_index].dt_login;
            this.novo_jogador.situacao = this.jogadores[param_index].situacao;
        },

        remJogador: function(param_index){
            
            this.jogadores.splice(param_index, 1);

            localStorage.setItem("jogadores" , JSON.stringify(this.jogadores));

            alert('Removeu o jogador: ' + param_index);
        },

        cleanFormularioJogador: function() {

          this.novo_jogador.id = '';
          this.novo_jogador.name = ''; 
          this.novo_jogador.senha = '';
          this.novo_jogador.dt_cadastro = '';
          this.novo_jogador.qtd_dinheiro = '';
          this.novo_jogador.qtd_pontos = '';
          this.novo_jogador.dt_login = '';
          this.novo_jogador.situacao = '';
        }
      }
    });
    
    new Vue ({
      el: '#patente', 
      data: dados,
      validations: {
          nova_patente: {

            nome: {
              required
            },
            cor: {
              required
            },
            dt_cria: {
              required,
              maxValue: value => value < new Date().toISOString()
            },
            logo: {
              required
            },
            qtd_min: {
              required
            }
          }
      },
      methods: { 

        status(validation) {
              return {
                  error: validation.$error,
                  dirty: validation.$dirty
              }
          },

        addPatente: function (v) {

          if(!v.$invalid){

            var patente_cod = this.nova_patente.cod;
            var patente_nome = this.nova_patente.nome;
            var patente_cor = this.nova_patente.cor;
            var patente_dt_cria = this.nova_patente.dt_cria;
            var patente_logo = this.nova_patente.logo;
            var patente_qtd_min = this.nova_patente.qtd_min;

            if(isNaN(parseInt(this.nova_patente.id))){
                    var proximo_cod;
                    if(this.patentes.length == 0){
                        proximo_cod = 1;
                    }else{
                        proximo_cod = (parseInt(this.patentes[this.patentes.length-1].cod) + 1)
                    }
                    this.patentes.push({cod: proximo_cod, 
                                    nome: patente_nome,
                                    cor: patente_cor,
                                    dt_cria: patente_dt_cria,
                                    logo: patente_logo,
                                    qtd_min: patente_qtd_min}
                                    );

                    alert('Nova patente cadastrada!');

                }else{
                
                    this.patentes[this.nova_patente.id] = {cod: patente_cod,  
                                    nome: patente_nome,
                                    cor: patente_cor,
                                    dt_cria: patente_dt_cria,
                                    logo: patente_logo,
                                    qtd_min: patente_qtd_min
                    }; 
                    alert('Patente alterada!');
                  
                }
                localStorage.setItem("patentes" , JSON.stringify(this.patentes));
                
                this.cleanFormularioPatente();
          } else {

            alert("Formulário incompleto!");
          }
        },

        editPatente: function (param_index) {

            this.nova_patente.id = param_index;
            this.nova_patente.cod = this.patentes[param_index].cod;
            this.nova_patente.nome = this.patentes[param_index].nome;
            this.nova_patente.cor = this.patentes[param_index].cor;
            this.nova_patente.dt_cria = this.patentes[param_index].dt_cria;
            this.nova_patente.logo = this.patentes[param_index].logo;
            this.nova_patente.qtd_min = this.patentes[param_index].qtd_min;                          
        },

        remPatente: function(param_index){

            this.patentes.splice(param_index, 1);

            localStorage.setItem("patentes" , JSON.stringify(this.patentes));

            alert('Removeu a patente: ' + param_index);
        },
        
        cleanFormularioPatente: function() {

            this.nova_patente.cod = '';
            this.nova_patente.nome = '';
            this.nova_patente.cor = '';
            this.nova_patente.dt_cria = '';
            this.nova_patente.logo = '';
            this.nova_patente.qtd_min = '';
        }
      }
    })

    new Vue({ 
      el: '#menu', 
      data: dados,
      validations: {
          novo_couple: {

            jogador: {
              required
            },
            patente: {
              required
            }
          }
      },
      methods: { 

        status(validation) {
            return {
                error: validation.$error,
                dirty: validation.$dirty
            }
        },

        addCouple: function (v) {

          if(!v.$invalid){

            var couple_jogador = this.novo_couple.jogador;
            var couple_patente = this.novo_couple.patente;

            if(isNaN(parseInt(this.novo_couple.id))){
                    this.couples.push({jogador: couple_jogador, 
                                    patente: couple_patente}
                                    );

                    alert('Novo jogador-patente cadastrado!');

                }else{
                
                    this.couples[this.novo_couple.id] = {jogador: couple_jogador,  
                                    patente: couple_patente
                    }; 
                    alert('Jogador-patente alterada!');
                  
                }
                localStorage.setItem("couples" , JSON.stringify(this.couples));
                
                this.cleanFormularioCouple();
          }
        },

        editCouple: function (param_index) {

        this.novo_couple.id = param_index;
        this.novo_couple.jogador = this.couples[param_index].jogador; 
        this.novo_couple.patente = this.couples[param_index].patente; 
        },

        remCouple: function(param_index){

        this.couples.splice(param_index, 1);

        localStorage.setItem("couples" , JSON.stringify(this.couples));

        alert('Removeu o couple: ' + param_index);
        },

        cleanFormularioCouple: function() {

          this.novo_couple.id = '';
          this.novo_couple.jogador = '';
          this.novo_couple.patente = '';
          }
      }
    });

  });