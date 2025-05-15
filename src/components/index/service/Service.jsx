import './service.css';
import smallService from '../../../assets/Electrician.svg';
import work from '../../../assets/Group.svg';


const services = [
    {
        title: 'Small Service',
        description: 'Track on all of your daily expense and make your day to day life easier',
        icon: smallService,
    },
    {
        title: 'Maintenance Work',
        description: 'Track on all of your daily expense and make your day to day life easier',
        icon: work,
    },
    {
        title: 'Projects',
        description: 'Track on all of your daily expense and make your day to day life easier',
        icon: work,
    },
];

export default function Service() {
    return (
        <section className="services">
            <h2>Services</h2>
            <p>
                We provide the best in class services for our customers
            </p>
            <div className="services-container">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className={`service-card ${service.active ? 'active' : ''}`}
                    >
                        <div className="service-icon">
                            <img src={service.icon} alt={service.title} className='icons-service' />
                        </div>
                        <h3>{service.title}</h3>
                        <p className="service-description">{service.description}</p>
                    </div>
                ))}
            </div>

        </section>
    );
}