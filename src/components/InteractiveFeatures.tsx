import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swords, Brain, Zap, ArrowRight } from 'lucide-react';

const InteractiveFeatures = () => {
  const features = [
    {
      icon: Swords,
      title: 'Comparateur',
      description: 'Comparez les stats de vos personnages favoris côte à côte',
      link: '/comparator',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Brain,
      title: 'Quiz Anime',
      description: 'Testez vos connaissances avec notre quiz interactif',
      link: '/quiz',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Simulateur de Combat',
      description: 'Découvrez qui gagnerait dans un duel épique',
      link: '/battle',
      gradient: 'from-blue-500 to-cyan-500'
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            <span className="gradient-text">FONCTIONNALITÉS INTERACTIVES</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Explorez et interagissez avec vos personnages préférés
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={feature.link} className="block group">
                <div className="glass-card rounded-2xl p-6 h-full hover:bg-muted/30 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                    Explorer
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveFeatures;
