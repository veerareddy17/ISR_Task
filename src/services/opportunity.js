

export default class OpportunityService {
    static fetchOpportunities = async () => {
        var response = { success: false, data: null };
        response.data = [{
            key: 'a',
            Opportunities: 1,
            estmatedToatl: 500,
            user: "customer"

        }, {
            key: 'b',
            Opportunities: 2,
            estmatedToatl: 400,
            user: "customer"
        },
        {
            key: 'c',
            Opportunities: 3,
            estmatedToatl: 5000,
            user: "customer"

        }, {
            key: 'd',
            Opportunities: 4,
            estmatedToatl: 100,
            user: "customer"
        },
        {
            key: 'a',
            Opportunities: 1,
            estmatedToatl: 500,
            user: "customer"

        }, {
            key: 'b',
            Opportunities: 2,
            estmatedToatl: 400,
            user: "customer"
        },
        {
            key: 'c',
            Opportunities: 3,
            estmatedToatl: 5000,
            user: "customer"

        }, {
            key: 'd',
            Opportunities: 4,
            estmatedToatl: 100,
            user: "customer"
        },
        {
            key: 'a',
            Opportunities: 1,
            estmatedToatl: 500,
            user: "customer"

        }, {
            key: 'b',
            Opportunities: 2,
            estmatedToatl: 400,
            user: "customer"
        },
        {
            key: 'c',
            Opportunities: 3,
            estmatedToatl: 5000,
            user: "customer"

        }, {
            key: 'd',
            Opportunities: 4,
            estmatedToatl: 100,
            user: "customer"
        }
        ];

        return response;
    };
}