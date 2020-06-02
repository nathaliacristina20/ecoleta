import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('items').insert([
    { title: 'Lampadas', image: 'lampadas.svg' },
    { title: 'Pilhas e baterias', image: 'baterias.svg' },
    { title: 'Papeis e Papelao', image: 'papeis-papelao.svg' },
    { title: 'Residuos Eletronicos', image: 'eletronicos.svg' },
    { title: 'Residuos Organicos', image: 'organicos.svg' },
    { title: 'Oleo de Cozinha', image: 'oleo.svg' },
  ])
}