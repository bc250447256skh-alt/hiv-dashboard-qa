describe('KPI API', () => {

  let data;

  before(() => {
    cy.request('/api/kpi').then((res) => {
      data = res.body;
    });
  });

  it('returns KPI data', () => {
    expect(data.length).to.be.greaterThan(0);
    expect(data[0]).to.have.property('report_date');
  });

  it('validates positivity rate calculation', () => {
    const row = data[0];
    const calculatedRate = row.positive / row.tests;

    expect(row.positivity_rate).to.be.closeTo(calculatedRate, 0.0001);
  });

it('validates field data types', () => {
  cy.request('/api/kpi').then((res) => {
    const record = res.body[0];

    expect(record.report_date).to.be.a('string');
    expect(record.tests).to.be.a('number');
    expect(record.positive).to.be.a('number');
    expect(record.positivity_rate).to.be.a('number');
  });
});


});

