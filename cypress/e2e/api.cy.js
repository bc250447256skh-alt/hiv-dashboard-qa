describe('KPI API', () => {

  it('returns KPI data', () => {
    cy.request('/api/kpi').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.length).to.be.greaterThan(0);
      expect(res.body[0]).to.have.property('report_date');
      expect(res.body[0]).to.have.property('tests');
      expect(res.body[0]).to.have.property('positive');
      expect(res.body[0]).to.have.property('positivity_rate');
    });
  });

  it('validates positivity rate calculation', () => {
    cy.request('/api/kpi').then((res) => {
      const row = res.body[0];

      const calculatedRate = row.positive / row.tests;

      expect(row.positivity_rate).to.be.closeTo(calculatedRate, 0.0001);
    });
  });

});

