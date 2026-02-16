export default function PeripheralData() {
  return (
    <div className="min-h-screen bg-[#050a12] text-white p-8" style={{ backgroundImage: 'radial-gradient(rgba(0, 245, 255, 0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      <div className="max-w-7xl mx-auto">
        
        <section className="border border-cyan-500/20 bg-white/[0.03] p-12 relative mb-10">
          <span className="absolute -top-3 left-5 bg-[#050a12] px-3 text-xs text-cyan-500 tracking-widest">
            05 // PERIPHERAL_DATA
          </span>
          
          <h2 className="text-4xl font-bold uppercase mb-8">Beyond_Code</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-cyan-500/5 border-l-4 border-cyan-500 p-6">
              <h3 className="text-sm uppercase mb-2">Musique</h3>
              <p className="text-xs opacity-70">Guitare classique, composition, arrangements</p>
            </div>
            <div className="bg-cyan-500/5 border-l-4 border-cyan-500 p-6">
              <h3 className="text-sm uppercase mb-2">Littérature</h3>
              <p className="text-xs opacity-70">Analyse textuelle, philosophie, sciences humaines</p>
            </div>
          </div>
        </section>

        <section className="border border-cyan-500/20 bg-white/[0.03] p-12 relative">
          <span className="absolute -top-3 left-5 bg-[#050a12] px-3 text-xs text-cyan-500 tracking-widest">
            06 // CONTACT_PROTOCOL
          </span>
          
          <h2 className="text-4xl font-bold uppercase mb-8">Initiate_Connection</h2>
          
          <p className="text-sm opacity-80 mb-6">
            Pour toute collaboration ou demande d'information, utilisez le formulaire de contact.
          </p>
          
          <button className="border border-cyan-500 text-cyan-500 px-8 py-3 text-sm tracking-widest hover:bg-cyan-500 hover:text-[#050a12] transition-all">
            SEND_MESSAGE
          </button>
        </section>

      </div>
    </div>
  );
}
