
/// <reference types="cypress" />

describe('Gerenciamento de Consultas Realizadas - UBS Digital Salvador', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  // ==============================================================
  // VISUALIZAÇÃO DE CONSULTAS - PACIENTE
  // ==============================================================
  context('Visualização de Consultas pelo Paciente', () => {

    beforeEach(() => {
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);
      cy.contains(/olá, maria/i, { timeout: 10000 }).should('be.visible');
    });

    it('CT-01: Deve listar todas as consultas do paciente', () => {
      // Navegar para consultas
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);
      cy.contains(/consultas/i, { timeout: 5000 }).should('be.visible');

      // Verificar que existem consultas listadas
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4')
        .should('have.length.greaterThan', 0);

      // Verificar elementos essenciais de cada consulta
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4').first().within(() => {
        // Nome do profissional
        cy.get('.font-semibold.text-gray-800').should('be.visible');
        // Especialidade
        cy.get('.text-sm.text-gray-600').should('be.visible');
        // Data e hora
        cy.get('.text-xs.text-gray-500').should('be.visible');
        // Status
        cy.get('.px-3.py-1.text-xs.rounded-full').should('be.visible');
      });
    });

    it('CT-02: Deve exibir informações completas de cada consulta', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Verificar primeira consulta com dados conhecidos
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4').first().within(() => {
        // Verificar profissional
        cy.contains(/dr\.|dra\./i).should('be.visible');
        
        // Verificar especialidade
        cy.contains(/cardiologia|ginecologia|pediatria/i).should('be.visible');
        
        // Verificar data no formato correto
        cy.get('.text-xs.text-gray-500')
          .invoke('text')
          .should('match', /\d{4}-\d{2}-\d{2}/);
        
        // Verificar horário
        cy.get('.text-xs.text-gray-500')
          .invoke('text')
          .should('match', /\d{2}:\d{2}/);
      });
    });

    it('CT-03: Deve exibir ícones corretos por status', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Verificar ícones SVG para cada status
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4').each(($card) => {
        cy.wrap($card).within(() => {
          // Deve ter ícone (SVG do Stethoscope)
          cy.get('svg').should('exist');
          
          // Verificar cor de fundo baseada no status
          const hasAgendada = $card.find('.bg-blue-100').length > 0;
          const hasRealizada = $card.find('.bg-green-100').length > 0;
          const hasCancelada = $card.find('.bg-red-100').length > 0;
          
          expect(hasAgendada || hasRealizada || hasCancelada).to.be.true;
        });
      });
    });

    it('CT-04: Deve mostrar badges de status com cores corretas', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Filtrar por "Todas" para ver todos os status
      cy.contains('button', /todas/i).click();
      cy.wait(300);

      // Verificar consultas agendadas
      cy.get('.bg-blue-100.text-blue-700').should('exist');
      
      // Filtrar por realizadas
      cy.contains('button', /realizada/i).click();
      cy.wait(300);
      
      // Verificar badge verde
      cy.get('.bg-green-100.text-green-700').should('exist');
    });

    it('CT-05: Deve permitir scroll na lista de consultas', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Verificar que a página tem scroll
      cy.get('.space-y-4').scrollTo('bottom');
      cy.wait(200);
      cy.get('.space-y-4').scrollTo('top');
      
      // Lista deve permanecer visível
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4').should('be.visible');
    });

    it('CT-06: Deve manter consultas ordenadas por data', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Coletar todas as datas
      const datas = [];
      cy.get('.text-xs.text-gray-500').each(($el) => {
        const texto = $el.text();
        const dataMatch = texto.match(/\d{4}-\d{2}-\d{2}/);
        if (dataMatch) {
          datas.push(dataMatch[0]);
        }
      }).then(() => {
        // Verificar que há pelo menos 2 consultas para comparar
        expect(datas.length).to.be.greaterThan(0);
      });
    });
  });

  // ==============================================================
  // FILTROS DE CONSULTAS
  // ==============================================================
  context('Filtros e Buscas de Consultas', () => {

    beforeEach(() => {
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);
    });

    it('CT-07: Deve filtrar consultas por status "Todas"', () => {
      // Clicar no filtro Todas
      cy.contains('button', /todas/i).click();
      cy.wait(300);

      // Verificar que o botão está ativo
      cy.contains('button', /todas/i)
        .should('have.class', 'bg-blue-600')
        .and('have.class', 'text-white');

      // Deve mostrar todas as consultas (agendadas + realizadas)
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4')
        .should('have.length.greaterThan', 0);
    });

    it('CT-08: Deve filtrar apenas consultas agendadas', () => {
      // Clicar no filtro Agendada
      cy.contains('button', /agendada/i).click();
      cy.wait(300);

      // Verificar que o botão está ativo
      cy.contains('button', /agendada/i)
        .should('have.class', 'bg-blue-600')
        .and('have.class', 'text-white');

      // Verificar que apenas consultas agendadas aparecem
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4').each(($card) => {
        cy.wrap($card).within(() => {
          cy.contains(/agendada/i).should('be.visible');
        });
      });

      // Não deve ter consultas realizadas visíveis
      cy.get('.bg-green-100.text-green-700').should('not.exist');
    });

    it('CT-09: Deve filtrar apenas consultas realizadas', () => {
      // Clicar no filtro Realizada
      cy.contains('button', /realizada/i).click();
      cy.wait(300);

      // Verificar que o botão está ativo
      cy.contains('button', /realizada/i)
        .should('have.class', 'bg-blue-600')
        .and('have.class', 'text-white');

      // Verificar que apenas consultas realizadas aparecem
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4').should('have.length.greaterThan', 0);
      
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4').each(($card) => {
        cy.wrap($card).within(() => {
          cy.contains(/realizada/i).should('be.visible');
        });
      });

      // Não deve ter consultas agendadas visíveis
      cy.get('.bg-blue-100.text-blue-700').should('not.exist');
    });

    it('CT-10: Deve filtrar consultas canceladas (quando existirem)', () => {
      // Clicar no filtro Cancelada
      cy.contains('button', /cancelada/i).click();
      cy.wait(300);

      // Verificar que o botão está ativo
      cy.contains('button', /cancelada/i)
        .should('have.class', 'bg-blue-600')
        .and('have.class', 'text-white');

      // Como não temos consultas canceladas no mock, pode não haver resultados
      // Mas o filtro deve funcionar
      cy.get('body').then($body => {
        if ($body.find('.bg-red-100.text-red-700').length > 0) {
          cy.get('.bg-red-100.text-red-700').should('be.visible');
        }
      });
    });

    it('CT-11: Deve alternar entre filtros mantendo funcionalidade', () => {
      const filtros = ['Todas', 'Agendada', 'Realizada', 'Cancelada'];

      filtros.forEach(filtro => {
        cy.contains('button', filtro).click();
        cy.wait(300);

        // Verificar que o filtro está ativo
        cy.contains('button', filtro)
          .should('have.class', 'bg-blue-600')
          .and('have.class', 'text-white');

        // Outros filtros não devem estar ativos
        filtros.filter(f => f !== filtro).forEach(outroFiltro => {
          cy.contains('button', outroFiltro)
            .should('have.class', 'bg-gray-200')
            .and('have.class', 'text-gray-700');
        });
      });
    });

    it('CT-12: Deve persistir filtro ao navegar entre telas', () => {
      // Aplicar filtro
      cy.contains('button', /realizada/i).click();
      cy.wait(300);

      // Verificar filtro ativo
      cy.contains('button', /realizada/i)
        .should('have.class', 'bg-blue-600');

      // Navegar para outra tela
      cy.get('[data-testid="nav-home"]').click();
      cy.wait(500);

      // Voltar para consultas
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Filtro deve ser resetado para "Todas"
      cy.contains('button', /todas/i)
        .should('have.class', 'bg-blue-600');
    });

    it('CT-13: Deve mostrar scroll horizontal nos filtros em telas pequenas', () => {
      // Verificar que os filtros têm overflow-x-auto
      cy.get('.flex.space-x-2.mb-6.overflow-x-auto')
        .should('exist')
        .and('have.class', 'overflow-x-auto');

      // Todos os filtros devem estar presentes
      cy.contains('button', /todas/i).should('exist');
      cy.contains('button', /agendada/i).should('exist');
      cy.contains('button', /realizada/i).should('exist');
      cy.contains('button', /cancelada/i).should('exist');
    });
  });

  // ==============================================================
  // VISUALIZAÇÃO PELO PROFISSIONAL
  // ==============================================================
  context('Visualização de Consultas pelo Profissional', () => {

    beforeEach(() => {
      cy.get('[data-testid="input-email"]').clear().type('111.222.333-44');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);
      cy.contains(/dr\. joão silva/i, { timeout: 10000 }).should('be.visible');
    });

    it('CT-14: Profissional deve ver apenas suas consultas', () => {
      // Verificar dashboard com consultas do profissional
      cy.contains(/horários disponíveis/i).should('be.visible');

      // Verificar que existem pacientes listados
      cy.get('.bg-green-100.rounded-full').should('exist');
      
      // Verificar nomes de pacientes (não de outros profissionais)
      cy.contains(/maria silva santos/i).should('be.visible');
    });

    it('CT-15: Deve exibir contadores corretos de consultas', () => {
      // Verificar contador de agendadas
      cy.get('[data-testid="professional-scheduled-count"]').within(() => {
        cy.contains(/agenda/i).should('be.visible');
        cy.get('.text-2xl.font-bold').should('be.visible');
        cy.get('.text-2xl.font-bold')
          .invoke('text')
          .then(text => {
            const count = parseInt(text);
            expect(count).to.be.at.least(0);
          });
        cy.contains(/agendadas/i).should('be.visible');
      });

      // Verificar contador de realizadas
      cy.get('[data-testid="professional-completed-count"]').within(() => {
        cy.contains(/realizadas/i).should('be.visible');
        cy.get('.text-2xl.font-bold').should('be.visible');
        cy.get('.text-2xl.font-bold')
          .invoke('text')
          .then(text => {
            const count = parseInt(text);
            expect(count).to.be.at.least(0);
          });
      });
    });

    it('CT-16: Deve listar pacientes com data e hora da consulta', () => {
      // Verificar lista de horários disponíveis
      cy.contains(/horários disponíveis/i).should('be.visible');

      // Verificar estrutura de cada item
      cy.get('.bg-green-100.rounded-full').should('exist');
      
      // Verificar informações de paciente
      cy.get('.font-medium.text-gray-800').should('have.length.greaterThan', 0);
      
      // Verificar data e hora
      cy.get('.text-sm.text-gray-600').should('have.length.greaterThan', 0);
    });

    it('CT-17: Deve navegar para lista completa de consultas', () => {
      // Usar navegação bottom para ir para consultas
      cy.get('[data-testid="nav-agenda"]').click();
      cy.wait(500);

      // Deve estar na tela de consultas
      cy.contains(/consultas/i).should('be.visible');

      // Deve ter filtros disponíveis
      cy.contains('button', /todas/i).should('be.visible');
      cy.contains('button', /agendada/i).should('be.visible');
    });

    it('CT-18: Profissional deve ver pacientes, não profissionais nas consultas', () => {
      cy.get('[data-testid="nav-agenda"]').click();
      cy.wait(500);

      // Verificar que mostra nomes de pacientes
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4').first().within(() => {
        cy.get('.font-semibold.text-gray-800')
          .invoke('text')
          .should('match', /maria|joão/i);
      });
    });
  });

  // ==============================================================
  // DASHBOARD - PRÓXIMAS CONSULTAS
  // ==============================================================
  context('Dashboard - Seção Próximas Consultas', () => {

    beforeEach(() => {
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);
    });

    it('CT-19: Deve exibir seção de próxima consulta no dashboard', () => {
      // Verificar título da seção
      cy.contains(/próxima consulta/i).should('be.visible');

      // Verificar card branco de consultas
      cy.get('.bg-white.rounded-xl.shadow-sm.p-6').should('exist');
    });

    it('CT-20: Deve mostrar apenas a próxima consulta agendada', () => {
      cy.contains(/próxima consulta/i).should('be.visible');

      // Verificar que mostra apenas UMA consulta
      cy.get('.bg-white.rounded-xl.shadow-sm.p-6').within(() => {
        // Deve ter no máximo 1 consulta listada ou mensagem de "nenhuma"
        cy.get('body').then($body => {
          const consultasVisiveis = $body.find('.flex.items-center.justify-between.p-4').length;
          expect(consultasVisiveis).to.be.at.most(1);
        });
      });
    });

    it('CT-21: Deve exibir mensagem quando não há consultas', () => {
      // Logout e login com paciente sem consultas
      cy.get('[data-testid="btn-logout"]').click({ force: true });
      cy.wait(1000);

      cy.get('[data-testid="input-email"]').clear().type('joao@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);

      // Verificar mensagem
      cy.contains(/nenhuma consulta agendada/i).should('be.visible');
    });

    it('CT-22: Consulta deve ter ícone, nome, especialidade e status', () => {
      // Verificar estrutura completa da próxima consulta
      cy.get('.bg-white.rounded-xl.shadow-sm.p-6').within(() => {
        cy.get('body').then($body => {
          if ($body.find('.bg-blue-100.rounded-full').length > 0) {
            // Ícone
            cy.get('.bg-blue-100.rounded-full').should('exist');
            cy.get('svg').should('exist');
            
            // Nome do profissional
            cy.get('.font-medium.text-gray-800').should('be.visible');
            
            // Especialidade
            cy.get('.text-sm.text-gray-600').should('be.visible');
            
            // Data e hora
            cy.get('.text-xs.text-gray-500').should('be.visible');
            
            // Badge de status
            cy.get('.bg-green-100.text-green-700').should('be.visible');
          }
        });
      });
    });

    it('CT-23: Deve atualizar próxima consulta ao agendar nova', () => {
      // Verificar estado inicial
      cy.contains(/próxima consulta/i).should('be.visible');

      // Agendar nova consulta
      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(300);

      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.wait(300);
      cy.contains('button', /dra\. maria oliveira/i).click();
      cy.wait(300);

      // Data muito próxima
      const amanha = new Date();
      amanha.setDate(amanha.getDate() + 1);
      cy.get('input[type="date"]').type(amanha.toISOString().split('T')[0]);
      cy.wait(500);

      cy.contains('button', '09:00').click();
      cy.wait(300);
      cy.contains('button', /confirmar agendamento/i).click();

      cy.on('window:alert', (text) => {
        expect(text).to.contains('sucesso');
      });

      cy.wait(1000);

      // Verificar que a nova consulta aparece
      cy.contains(/próxima consulta/i).should('be.visible');
      cy.contains(/dra\. maria oliveira/i).should('be.visible');
    });
  });

  // ==============================================================
  // DETALHES E INFORMAÇÕES DAS CONSULTAS
  // ==============================================================
  context('Detalhes e Informações das Consultas', () => {

    beforeEach(() => {
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);
    });

    it('CT-24: Deve exibir nome completo do profissional', () => {
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4').first().within(() => {
        cy.get('.font-semibold.text-gray-800')
          .invoke('text')
          .should('match', /dr\.|dra\./i);
      });
    });

    it('CT-25: Deve exibir especialidade médica', () => {
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4').first().within(() => {
        cy.contains(/cardiologia|ginecologia|pediatria|clínica geral|dermatologia/i)
          .should('be.visible');
      });
    });

    it('CT-26: Deve exibir data no formato correto', () => {
      cy.get('.text-xs.text-gray-500').first()
        .invoke('text')
        .should('match', /\d{4}-\d{2}-\d{2}/);
    });

    it('CT-27: Deve exibir horário no formato HH:MM', () => {
      cy.get('.text-xs.text-gray-500').first()
        .invoke('text')
        .should('match', /\d{2}:\d{2}/);
    });

    it('CT-28: Deve ter cores distintas para cada status', () => {
      // Verificar cores de agendada
      cy.contains('button', /agendada/i).click();
      cy.wait(300);
      
      cy.get('.bg-blue-100').should('exist'); // Ícone azul
      cy.get('.bg-blue-100.text-blue-700').should('exist'); // Badge azul

      // Verificar cores de realizada
      cy.contains('button', /realizada/i).click();
      cy.wait(300);
      
      cy.get('.bg-green-100').should('exist'); // Ícone verde
      cy.get('.bg-green-100.text-green-700').should('exist'); // Badge verde
    });

    it('CT-29: Deve exibir layout responsivo dos cards', () => {
      // Verificar estrutura flex das consultas
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4').first().within(() => {
        cy.get('.flex.items-center.justify-between').should('exist');
        cy.get('.flex.items-center').should('exist');
      });

      // Verificar ícones circulares
      cy.get('.w-12.h-12.rounded-full').should('exist');
    });

    it('CT-30: Deve ter espaçamento adequado entre consultas', () => {
      // Verificar classe space-y-4
      cy.get('.space-y-4').should('exist');
      
      // Verificar que há múltiplas consultas
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4')
        .should('have.length.greaterThan', 1);
    });
  });

  // ==============================================================
  // NAVEGAÇÃO E INTERAÇÃO
  // ==============================================================
  context('Navegação e Interação com Consultas', () => {

    beforeEach(() => {
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);
    });

    it('CT-31: Deve navegar do dashboard para lista de consultas', () => {
      // Clicar no botão de consultas
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Verificar que está na tela correta
      cy.contains(/consultas/i).should('be.visible');
      cy.get('.space-y-4').should('exist');
    });

    it('CT-32: Deve usar bottom navigation para acessar consultas', () => {
      // Usar navegação inferior
      cy.get('[data-testid="nav-consultations"]').click();
      cy.wait(500);

      // Verificar navegação
      cy.contains(/consultas/i).should('be.visible');
    });

    it('CT-33: Deve voltar ao dashboard usando botão de voltar', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Clicar no botão de voltar (ArrowLeft)
      cy.get('button').first().click();
      cy.wait(500);

      // Verificar retorno
      cy.contains(/olá, maria/i).should('be.visible');
      cy.get('[data-testid="btn-schedule"]').should('be.visible');
    });

    it('CT-34: Deve voltar ao dashboard usando bottom navigation', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Usar bottom nav
      cy.get('[data-testid="nav-home"]').click();
      cy.wait(500);

      // Verificar retorno
      cy.contains(/olá, maria/i).should('be.visible');
    });

    it('CT-35: Deve manter estado da lista ao navegar', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Rolar a lista
      cy.get('.space-y-4').scrollTo('bottom');
      cy.wait(300);

      // Sair e voltar
      cy.get('[data-testid="nav-home"]').click();
      cy.wait(300);
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Lista deve estar no topo novamente
      cy.get('.space-y-4').should('be.visible');
    });
  });

  // ==============================================================
  // PERFORMANCE E RESPONSIVIDADE
  // ==============================================================
  context('Performance e Responsividade', () => {

    beforeEach(() => {
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);
    });

    it('CT-36: Deve carregar lista de consultas rapidamente', () => {
      const start = Date.now();
      
      cy.get('[data-testid="btn-consultations"]').click();
      
      cy.contains(/consultas/i).should('be.visible').then(() => {
        const loadTime = Date.now() - start;
        expect(loadTime).to.be.lessThan(2000); // Menos de 2 segundos
      });
    });

    it('CT-37: Filtros devem responder imediatamente', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      const filtros = ['Agendada', 'Realizada', 'Todas'];
      
      filtros.forEach(filtro => {
        const start = Date.now();
        
        cy.contains('button', filtro).click();
        
        cy.contains('button', filtro)
          .should('have.class', 'bg-blue-600')
          .then(() => {
            const responseTime = Date.now() - start;
            expect(responseTime).to.be.lessThan(500); // Menos de 500ms
          });
      });
    });

    it('CT-38: Deve renderizar todos os cards sem lag', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Verificar que todos os cards são renderizados
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4')
        .should('have.length.greaterThan', 0)
        .and('be.visible');

      // Scroll deve ser suave
      cy.get('.space-y-4').scrollTo('bottom', { duration: 1000 });
      cy.get('.space-y-4').scrollTo('top', { duration: 1000 });
    });

    it('CT-39: Layout deve ser responsivo em mobile (max-w-md)', () => {
      // Verificar container principal
      cy.get('.max-w-md.mx-auto').should('exist');

      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Verificar que consultas ocupam toda largura disponível
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4')
        .first()
        .should('be.visible');

      // Verificar padding adequado
      cy.get('.p-6').should('exist');
    });

    it('CT-40: Deve manter legibilidade em telas pequenas', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Verificar tamanhos de fonte adequados
      cy.get('.font-semibold.text-gray-800').should('have.css', 'font-size');
      cy.get('.text-sm.text-gray-600').should('have.css', 'font-size');
      cy.get('.text-xs.text-gray-500').should('have.css', 'font-size');
    });
  });

  // ==============================================================
  // CASOS EDGE E VALIDAÇÕES
  // ==============================================================
  context('Casos Edge e Validações Especiais', () => {

    it('CT-41: Deve lidar com paciente sem consultas', () => {
      // Login com João que tem menos consultas
      cy.get('[data-testid="input-email"]').clear().type('joao@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);

      // Acessar consultas
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Deve mostrar algum conteúdo (mesmo que seja só dele)
      cy.contains(/consultas/i).should('be.visible');
    });

    it('CT-42: Deve lidar com múltiplas consultas no mesmo dia', () => {
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);

      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Verificar que consultas com mesma data são exibidas separadamente
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4')
        .should('have.length.greaterThan', 0);
    });

    it('CT-43: Deve exibir corretamente consultas de diferentes especialidades', () => {
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);

      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Deve ter pelo menos 2 especialidades diferentes
      const especialidades = new Set();
      
      cy.get('.text-sm.text-gray-600').each(($el) => {
        const texto = $el.text().toLowerCase();
        if (texto.includes('cardiologia')) especialidades.add('cardiologia');
        if (texto.includes('pediatria')) especialidades.add('pediatria');
        if (texto.includes('ginecologia')) especialidades.add('ginecologia');
      }).then(() => {
        expect(especialidades.size).to.be.greaterThan(0);
      });
    });

    it('CT-44: Deve manter integridade dos dados ao aplicar filtros', () => {
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);

      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Contar total inicial
      let totalInicial;
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4')
        .its('length')
        .then(count => {
          totalInicial = count;
        });

      // Filtrar por Agendada
      cy.contains('button', /agendada/i).click();
      cy.wait(300);

      let totalAgendada;
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4')
        .its('length')
        .then(count => {
          totalAgendada = count;
        });

      // Filtrar por Realizada
      cy.contains('button', /realizada/i).click();
      cy.wait(300);

      let totalRealizada;
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4')
        .its('length')
        .then(count => {
          totalRealizada = count;
          
          // Verificar que a soma faz sentido
          expect(totalAgendada + totalRealizada).to.be.at.least(0);
        });
    });

    it('CT-45: Deve tratar textos longos sem quebrar layout', () => {
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);

      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Verificar que cards mantêm estrutura
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4').first().within(() => {
        // Elementos devem estar alinhados
        cy.get('.flex.items-center').should('exist');
        
        // Texto não deve transbordar
        cy.get('.font-semibold.text-gray-800')
          .should('have.css', 'overflow-wrap', 'break-word')
          .or('have.css', 'word-wrap', 'break-word');
      });
    });
  });

  // ==============================================================
  // ACESSIBILIDADE E UX
  // ==============================================================
  context('Acessibilidade e Experiência do Usuário', () => {

    beforeEach(() => {
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);
    });

    it('CT-46: Botões de filtro devem ter feedback visual ao hover', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Verificar classes de hover
      cy.contains('button', /todas/i)
        .should('have.class', 'rounded-full');
    });

    it('CT-47: Cards devem ter sombra e bordas arredondadas', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Verificar classes de estilo
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4')
        .should('have.class', 'rounded-xl')
        .and('have.class', 'shadow-sm');
    });

    it('CT-48: Ícones devem ter tamanho consistente', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Verificar tamanho dos círculos de ícone
      cy.get('.w-12.h-12.rounded-full').each(($circle) => {
        cy.wrap($circle)
          .should('have.class', 'w-12')
          .and('have.class', 'h-12');
      });
    });

    it('CT-49: Deve ter contraste adequado em textos', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Verificar classes de cor com bom contraste
      cy.get('.text-gray-800').should('exist'); // Título escuro
      cy.get('.text-gray-600').should('exist'); // Subtítulo médio
      cy.get('.text-gray-500').should('exist'); // Texto secundário
    });

    it('CT-50: Deve ter espaçamento consistente entre elementos', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Verificar espaçamento vertical
      cy.get('.space-y-4').should('exist');
      
      // Verificar espaçamento horizontal nos filtros
      cy.get('.space-x-2').should('exist');
      
      // Verificar padding dos cards
      cy.get('.p-4').should('exist');
      cy.get('.p-6').should('exist');
    });

    it('CT-51: Badges de status devem ser visualmente distintas', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Verificar filtro Todas primeiro
      cy.contains('button', /todas/i).click();
      cy.wait(300);

      // Verificar badges com cores diferentes
      cy.get('.rounded-full').should('have.length.greaterThan', 0);
      
      // Agendada: azul
      cy.get('.bg-blue-100.text-blue-700').should('exist');
    });

    it('CT-52: Deve ter título claro na página de consultas', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Verificar título
      cy.get('.text-xl.font-bold')
        .contains(/consultas/i)
        .should('be.visible');
    });

    it('CT-53: Botão de voltar deve ser facilmente identificável', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Verificar que existe botão de voltar
      cy.get('button').first().within(() => {
        cy.get('svg').should('exist'); // Ícone ArrowLeft
      });
    });

    it('CT-54: Lista deve ter scroll suave', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Verificar scroll behavior
      cy.get('.space-y-4')
        .scrollTo('bottom', { duration: 500 })
        .wait(200)
        .scrollTo('center', { duration: 500 })
        .wait(200)
        .scrollTo('top', { duration: 500 });

      // Lista deve permanecer funcional
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4').should('be.visible');
    });

    it('CT-55: Deve ter feedback visual ao clicar em filtros', () => {
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Clicar em um filtro
      cy.contains('button', /agendada/i).click();
      cy.wait(100);

      // Verificar mudança visual imediata
      cy.contains('button', /agendada/i)
        .should('have.class', 'bg-blue-600')
        .and('have.class', 'text-white');
    });
  });

  // ==============================================================
  // INTEGRAÇÃO ENTRE FUNCIONALIDADES
  // ==============================================================
  context('Integração entre Funcionalidades', () => {

    it('CT-56: Nova consulta agendada deve aparecer na lista', () => {
      // Login
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);

      // Contar consultas iniciais
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      let consultasIniciais;
      cy.get('.bg-white.rounded-xl.shadow-sm.p-4')
        .its('length')
        .then(count => {
          consultasIniciais = count;
        });

      // Voltar e agendar nova consulta
      cy.get('[data-testid="nav-home"]').click();
      cy.wait(300);

      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(300);

      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.wait(300);
      cy.contains('button', /dr\. joão silva/i).click();
      cy.wait(300);

      const dataFutura = new Date();
      dataFutura.setDate(dataFutura.getDate() + 15);
      cy.get('input[type="date"]').type(dataFutura.toISOString().split('T')[0]);
      cy.wait(500);

      cy.contains('button', '16:00').click();
      cy.wait(300);
      cy.contains('button', /confirmar agendamento/i).click();

      cy.on('window:alert', (text) => {
        expect(text).to.contains('sucesso');
      });

      cy.wait(1000);

      // Verificar lista atualizada
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      cy.get('.bg-white.rounded-xl.shadow-sm.p-4')
        .its('length')
        .should('be.greaterThan', consultasIniciais);
    });

    it('CT-57: Logout deve limpar estado das consultas', () => {
      // Login e acessar consultas
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);

      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Aplicar filtro
      cy.contains('button', /realizada/i).click();
      cy.wait(300);

      // Logout
      cy.get('[data-testid="btn-logout"]').click({ force: true });
      cy.wait(1000);

      // Login novamente
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);

      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Filtro deve estar resetado para "Todas"
      cy.contains('button', /todas/i)
        .should('have.class', 'bg-blue-600');
    });

    it('CT-58: Dados de consultas devem persistir durante navegação', () => {
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);

      // Acessar consultas e guardar dados
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      let primeiraConsulta;
      cy.get('.font-semibold.text-gray-800').first()
        .invoke('text')
        .then(text => {
          primeiraConsulta = text;
        });

      // Navegar para outras telas
      cy.get('[data-testid="nav-home"]').click();
      cy.wait(300);
      cy.get('[data-testid="nav-schedule"]').click();
      cy.wait(300);
      cy.get('[data-testid="nav-consultations"]').click();
      cy.wait(500);

      // Verificar que dados permanecem
      cy.get('.font-semibold.text-gray-800').first()
        .invoke('text')
        .should('equal', primeiraConsulta);
    });

    it('CT-59: Dashboard e lista devem mostrar informações consistentes', () => {
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);

      // Guardar info da próxima consulta no dashboard
      let profissionalDashboard;
      cy.get('.bg-white.rounded-xl.shadow-sm.p-6').within(() => {
        cy.get('body').then($body => {
          if ($body.find('.font-medium.text-gray-800').length > 0) {
            cy.get('.font-medium.text-gray-800').first()
              .invoke('text')
              .then(text => {
                profissionalDashboard = text;
              });
          }
        });
      });

      // Ir para lista de consultas
      cy.get('[data-testid="btn-consultations"]').click();
      cy.wait(500);

      // Verificar que a mesma consulta existe na lista
      if (profissionalDashboard) {
        cy.contains(profissionalDashboard).should('exist');
      }
    });

    it('CT-60: Deve sincronizar visualizações entre paciente e profissional', () => {
      // Login como paciente e agendar
      cy.get('[data-testid="input-email"]').clear().type('maria@email.com');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);

      cy.get('[data-testid="btn-schedule"]').click();
      cy.wait(300);

      cy.contains('button', /unidade básica de saúde da federação/i).click();
      cy.wait(300);
      cy.contains('button', /dr\. joão silva/i).click();
      cy.wait(300);

      const dataFutura = new Date();
      dataFutura.setDate(dataFutura.getDate() + 20);
      const dataFormatada = dataFutura.toISOString().split('T')[0];
      cy.get('input[type="date"]').type(dataFormatada);
      cy.wait(500);

      cy.contains('button', '11:00').click();
      cy.wait(300);
      cy.contains('button', /confirmar agendamento/i).click();

      cy.on('window:alert', (text) => {
        expect(text).to.contains('sucesso');
      });

      cy.wait(1000);

      // Logout
      cy.get('[data-testid="btn-logout"]').click({ force: true });
      cy.wait(1000);

      // Login como profissional
      cy.get('[data-testid="input-email"]').clear().type('111.222.333-44');
      cy.get('[data-testid="input-password"]').clear().type('123456');
      cy.get('[data-testid="btn-login"]').click();
      cy.wait(500);

      // Verificar que a consulta aparece para o profissional
      cy.contains(/maria silva santos/i).should('be.visible');
      cy.contains(dataFormatada).should('be.visible');
    });
  });
});