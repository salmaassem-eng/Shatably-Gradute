import './service.css';
import smallService from '../../../assets/Electrician.svg';
import work from '../../../assets/Group.svg';


const services = [
    {
        title: 'Small Service',
        description: 'Book skilled pros for quick fixes—plumbing drips, shelf installs, furniture assembly—at clear, upfront prices.',
        icon: smallService,
    },
    {
        title: 'Maintenance Work',
        description: 'Schedule routine checks or urgent repairs for HVAC, plumbing, electrical, and appliances, all tracked in‑app.',
        icon: work,
    },
    {
        title: 'Projects',
        description: 'From kitchen remodels to bathroom overhauls, get end‑to‑end project management with progress updates in one place.',
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