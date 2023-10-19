const questions = {
  data: [
    {
      step: {
        id: 123,
        name: 'Estrutura',
        score: 91.85,
        questions: [
          {
            question: {
              id: 1734,
              name:
                'A fachada da loja em perfeitas condições e com ampla visibilidade, sem avarias como riscos, pichações, mosaico quebrado, grade na frente da vitrine, etc?',
              score: 100,
            },
          },
          {
            question: {
              id: 1735,
              name:
                'A vitrine está montada conforme o guia de ambientação com as comunicações permanentes e do ciclo: peças do ciclo, equipamentos e produtos?',
              score: 64,
            },
          },
          {
            question: {
              id: 1736,
              name:
                'Todo o mobiliário de loja está dentro dos padrões e em bom estado de conservação?',
              score: 30,
            },
          },
          {
            question: {
              id: 1737,
              name:
                'Letreiro com a logo atual  "O Boticário" em perfeito estado (atentar se está sujo, amarelado, apagado, quebrado)?',
              score: 100,
            },
          },
          {
            question: {
              id: 1738,
              name:
                'Itens de infraestrutura estão adequados? (todas as luminárias e lâmpadas acesas, piso limpo, capacho em dias de chuva, Rádio O Boticário com volume agradável e Ar condicionado com temperatura agradável)',
              score: 100,
            },
          },
          {
            question: {
              id: 1739,
              name:
                'A loja possui o coletor de embalagens padrão e com a comunicação atual  na área de vendas?',
              score: 100,
            },
          },
        ],
      },
    },
    {
      step: {
        id: 124,
        name: 'Equipe',
        score: 96.88,
        questions: [
          {
            question: {
              id: 1740,
              name:
                'Equipe está maquiada, buscando sempre o equilíbrio na utilização dos produtos?',
              score: 100,
            },
          },
          {
            question: {
              id: 1741,
              name:
                'Toda a equipe está vestida com uniforme em boas condições, com calçado homologado ou seguindo o padrão indicado?',
              score: 100,
            },
          },
        ],
      },
    },
    {
      step: {
        id: 125,
        name: 'Cuidados',
        score: 95.29,
        questions: [
          {
            question: {
              id: 1742,
              name:
                'A exposição de kits montados em loja assim como o empilhamento de kits estão apenas nos locais recomendados?',
              score: 100,
            },
          },
          {
            question: {
              id: 1743,
              name:
                'A precificação de todos os itens da categoria está correta e atualizada conforme o ciclo?',
              score: 100,
            },
          },
          {
            question: {
              id: 1744,
              name:
                'As prateleira e displays estão limpos, com exposição conforme os mapas do planograma e sem ruptura?',
              score: 100,
            },
          },
          {
            question: {
              id: 1745,
              name:
                'Os displays de impulso estão sempre cheios com produtos em exaustão, promocionados ou conforme o guia?',
              score: 100,
            },
          },
          {
            question: {
              id: 1746,
              name:
                'Os produtos faltantes com o adesivo "esgotado" foram trocados? Isso vale só para make.',
              score: 100,
            },
          },
          {
            question: {
              id: 1747,
              name:
                'Os displays permanentes estão em perfeito estado,  sem avarias e com as comunicaçõea atualizadas?',
              score: 100,
            },
          },
          {
            question: {
              id: 1748,
              name:
                'Se a loja for modelo Prisma 2.0, as marcas dentro das categorias estão sinalizadas? (ex: ameixa, ameixa negra, etc.).',
              score: 100,
            },
          },
          {
            question: {
              id: 1749,
              name:
                'Todos os demonstradores (testers) recomendados no guia de exposição estão expostos e com adesivo de "prove"? Todos os demonstradores de perfumaria (splashes) estão com tampa?',
              score: 100,
            },
          },
        ],
      },
    },
    {
      step: {
        id: 126,
        name: 'Make',
        score: 96.96,
        questions: [
          {
            question: {
              id: 1751,
              name:
                'A precificação de todos os itens da categoria está correta e atualizada conforme o ciclo?',
              score: 100,
            },
          },
          {
            question: {
              id: 1752,
              name:
                'Possui aplicadores descartáveis próximos a exposição e displays de maquiagem sempre abastecidos e limpos?',
              score: 100,
            },
          },
          {
            question: {
              id: 1753,
              name:
                'As prateleira e displays estão limpos, com exposição conforme os mapas do planograma e sem ruptura? Os displays de maquiagem estão com todas as comunicações vigentes e sem peças antigas de outros ciclos?',
              score: 100,
            },
          },
          {
            question: {
              id: 1754,
              name:
                'Os produtos faltantes com o adesivo "esgotado" foram trocados?',
              score: 100,
            },
          },
          {
            question: {
              id: 1755,
              name:
                'Todos os demonstradores (testers) recomendados estão no guia de exposição? Os displays de maquiagem estão com todos os testers disponíveis para experimentação?',
              score: 100,
            },
          },
        ],
      },
    },
    {
      step: {
        id: 127,
        name: 'Perfumaria',
        score: 96.82,
        questions: [
          {
            question: {
              id: 1756,
              name:
                'A exposição de kits montados em loja assim como o empilhamento de kits estão apenas nos locais recomendados?',
              score: 100,
            },
          },
          {
            question: {
              id: 1757,
              name:
                'A loja oferece fitas olfativas para experimentação? As fitas estão próximas às perfumarias, nos devidos suportes e limpas? A loja possui fitas usadas espalhadas pela loja?',
              score: 100,
            },
          },
          {
            question: {
              id: 1758,
              name:
                'A precificação de todos os itens da categoria está correta e atualizada conforme o ciclo?',
              score: 100,
            },
          },
          {
            question: {
              id: 1759,
              name:
                'As prateleira e displays estão limpos, com exposição conforme os mapas do planograma e sem ruptura?',
              score: 100,
            },
          },
          {
            question: {
              id: 1760,
              name:
                'Se a loja for modelo Prisma 2.0, as marcas dentro das categorias estão sinalizadas? (ex: Malbec, Glamour, Egeo, etc.).',
              score: 100,
            },
          },
          {
            question: {
              id: 1761,
              name:
                'Os displays permanentes estão em perfeito estado,  sem avarias e com as comunicaçõea atualizadas?',
              score: 100,
            },
          },
          {
            question: {
              id: 1762,
              name:
                'Todos os demonstradores (testers) recomendados no guia de exposição estão expostos e com adesivo de "prove"? Todos os demonstradores de perfumaria estão com tampa?',
              score: 100,
            },
          },
        ],
      },
    },
    {
      step: {
        id: 128,
        name: 'Prepare-se para Surpreender',
        score: 91.51,
        questions: [
          {
            question: {
              id: 1728,
              name:
                'O responsável da loja garante que todos os consultores(as) tenham acesso e visualizem os treinamentos, materiais de consulta e guias do ciclo?',
              score: 100,
            },
          },
          {
            question: {
              id: 1729,
              name:
                'O responsável da loja promove a troca de experiências e boas práticas através de conversas ou vídeos?',
              score: 100,
            },
          },
        ],
      },
    },
    {
      step: {
        id: 129,
        name: 'Surpreenda e Venda',
        score: 79.47,
        questions: [
          {
            question: {
              id: 1730,
              name:
                'O responsável da loja orienta o uso correto da ferramenta de CRM (caderneta de clientes ou Action) para aumento do fluxo de clientes?',
              score: 100,
            },
          },
          {
            question: {
              id: 1731,
              name:
                'O responsável da loja utiliza o cardápio Pop Solution para promover mais e melhores vendas?',
              score: 100,
            },
          },
        ],
      },
    },
    {
      step: {
        id: 130,
        name: 'Conversas Poderosas',
        score: 88.03,
        questions: [
          {
            question: {
              id: 1732,
              name:
                'O responsável da loja utiliza o Checklist de Atendimento para mapear as dificuldades e orientar os consultores a realizar o Atendimento Surpreenda?',
              score: 100,
            },
          },
          {
            question: {
              id: 1733,
              name:
                'O responsável da loja utiliza o formulário de feedback para registrar os pontos positivos e os pontos a desenvolver dos consultores?',
              score: 100,
            },
          },
        ],
      },
    },
    {
      step: {
        id: 131,
        name: 'Inicio do Ciclo',
        score: 0,
        questions: [
          {
            question: {
              id: 1763,
              name:
                'Ao receber a caixa do ciclo, verificou se recebeu todos os materiais corretamente e em bom estado e se faltou algo solicitou reposição ao operador logístico?',
              score: 0,
            },
          },
          {
            question: {
              id: 1764,
              name:
                'O estoque está organizado e devidamente registrado nos sistemas da franqueadora?',
              score: 0,
            },
          },
          {
            question: {
              id: 1765,
              name:
                'O guia de ambientação do ciclo foi lido antes de começar a montagem das peças de comunicação?',
              score: 0,
            },
          },
          {
            question: {
              id: 1766,
              name:
                'A montagem dos kits e embalagens está em perfeito estado conforme as recomendações da indústria?',
              score: 0,
            },
          },
          {
            question: {
              id: 1767,
              name:
                'Todos os itens da loja foram precificados conforme o ciclo vigente?',
              score: 0,
            },
          },
          {
            question: {
              id: 1768,
              name:
                'Foram retiradas as peças da loja referentes ao ciclo anterior que não serão mantidas no novo ciclo?',
              score: 0,
            },
          },
          {
            question: {
              id: 1769,
              name:
                'Foi verificada a validade das imagens na Botiweb e feitas as substituições sempre que orientado no Guia? ',
              score: 0,
            },
          },
          {
            question: {
              id: 1770,
              name:
                'Foram aplicadas todas as comunicações do ciclo corretamente?',
              score: 0,
            },
          },
          {
            question: {
              id: 1771,
              name:
                'Foram verificadas todas as peças que precisam ser retiradas das lojas devido ao prazo de validade das imagens?',
              score: 0,
            },
          },
        ],
      },
    },
    {
      step: {
        id: 132,
        name: 'Loja Impecável',
        score: 92.41,
        questions: [
          {
            question: {
              id: 1721,
              name:
                'O responsável da loja está promovendo o uso do Checklist de Loja Impecável com todos os consultores, sendo criterioso nas avaliações, orientando em caso de dúvidas e dando feedbacks em caso de não conformidade?',
              score: 100,
            },
          },
          {
            question: {
              id: 1722,
              name:
                'O responsável da loja garante que a loja esteja limpa e organizada? (com fachada, vitrine, piso, prateleiras, espelhos e retaguarda em perfeitas condições)',
              score: 100,
            },
          },
          {
            question: {
              id: 1723,
              name:
                'O responsável da loja garante que os consultores(as) de venda estão preparados, com uniforme padrão, maquiagem, unha e cabelos arrumados?',
              score: 100,
            },
          },
        ],
      },
    },
    {
      step: {
        id: 133,
        name: 'Olho no Resultado',
        score: 94.9,
        questions: [
          {
            question: {
              id: 1724,
              name:
                'O responsável da loja compreende e analisa os indicadores através do Painel de Resultados?',
              score: 100,
            },
          },
          {
            question: {
              id: 1725,
              name:
                'O responsável promove a analise dos resultados por todos os consultores, se colocando a disposição para orientá-los em caso de dúvidas?',
              score: 100,
            },
          },
        ],
      },
    },
    {
      step: {
        id: 134,
        name: 'Hora de Agir',
        score: 92.62,
        questions: [
          {
            question: {
              id: 1726,
              name:
                'O responsável da loja está fazendo a Bússola da Loja semanalmente, endereçando os indicadores mais críticos e/ou problemas crônicos?',
              score: 100,
            },
          },
          {
            question: {
              id: 1727,
              name:
                'O responsável da loja garente que todos os consultores estão utilizando a Bússola do Consultor no indicador com maior desvio, orientando e validando junto a eles?',
              score: 100,
            },
          },
        ],
      },
    },
    {
      step: {
        id: 135,
        name: 'Crie mais Oportunidades',
        score: 0,
        questions: [],
      },
    },
    {
      step: {
        id: 136,
        name: 'Conquiste o Retorno',
        score: 0,
        questions: [],
      },
    },
    {
      step: {
        id: 137,
        name: 'Organização de Produtos',
        score: 0,
        questions: [],
      },
    },
    {
      step: {
        id: 138,
        name: 'Entenda o Cliente',
        score: 0,
        questions: [],
      },
    },
    {
      step: {
        id: 139,
        name: 'Atenda seu Desejo',
        score: 0,
        questions: [],
      },
    },
    {
      step: {
        id: 151,
        name: 'Bússola',
        score: 67.74,
        questions: [
          {
            question: {
              id: 1835,
              name:
                'Todos os Consultores de Venda preencheram a Bússola corretamente ?',
              score: 100,
            },
          },
          {
            question: {
              id: 1868,
              name:
                'Todos os Consultores de Venda atingiram a meta financeira do dia?',
              score: 100,
            },
          },
        ],
      },
    },
    {
      step: {
        id: 152,
        name: 'Assinatura',
        score: 0,
        questions: [
          {
            question: {
              id: 1836,
              name: 'Documento Comprovatório',
              score: 0,
            },
          },
          {
            question: {
              id: 4209,
              name:
                'Para comprovar a realização da ação, envie uma foto da planilha de controle de contatos e conversões.',
              score: 0,
            },
          },
          {
            question: {
              id: 4292,
              name: 'Documento Comprobatório',
              score: 0,
            },
          },
        ],
      },
    },
    {
      step: {
        id: 307,
        name: 'Mecânica',
        score: 90,
        questions: [
          {
            question: {
              id: 4207,
              name:
                'A ação para gerar fluxo em loja, vinculada a caderneta de clientes, já está disponível. Clique no botão abaixo (com o desenho de um papel) e vem conferir! \r\nEntendeu a ação e a mecânica?',
              score: 100,
            },
          },
        ],
      },
    },
    {
      step: {
        id: 308,
        name: 'Realização',
        score: 77.78,
        questions: [
          {
            question: {
              id: 4208,
              name:
                'Você realizou a ação na loja? Quantos clientes vocês contataram?',
              score: 0,
            },
          },
        ],
      },
    },
  ],
};

export default questions;
