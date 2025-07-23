
import { 
    Twitter,
  } from 'lucide-react';

const Marquee = () => {
    return (
      <section id="flow" className="relative py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="mx-auto px-6">
            <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
                <span className="text-cyan-400">Build</span> → 
                <span className="text-pink-400 mx-2">Write</span> → 
                <span className="text-yellow-400 mx-2">Ship</span> → 
                <span className="text-green-400">Post</span>
            </h2>
            <p className="text-xl text-gray-400 font-mono">// The X lifecycle automated</p>
            </div>

            {/* Creative Marquee Animation */}
            <div className="marquee-container overflow-hidden">
            {/* First Row - Infinite Marquee Demo */}
            <div className="overflow-x-hidden w-full mb-8">
                <div className="marquee-infinite">
                {/* Render all 6 cards, then duplicate for seamless loop */}
                {[...Array(2)].flatMap((_, dupIdx) => [
                    // Card 1
                    <div key={`memory_leak_${dupIdx}`} className="inline-block align-top w-96 h-80 bg-gray-900 border border-gray-700 rounded-xl p-6 transition-all duration-300 group mr-8">
                    <div className="flex flex-col gap-4">
                        {/* Journal Side */}
                        <div className="space-y-3">
                          <span className="text-xs text-gray-400 font-semibold">Journal</span>
                        <p className="text-xs text-gray-300 leading-relaxed break-words overflow-hidden whitespace-normal">
                            Today I explored a new hiking trail just outside the city. The air was crisp, the scenery breathtaking, and I felt completely recharged by the end of the journey. I even spotted a family of deer grazing quietly in a clearing, which made the experience even more magical.
                        </p>
                        </div>
                        {/* Tweet Side */}
                        <div className="space-y-3 border-t border-gray-700 pt-4">
                          <span className="text-xs text-gray-400 font-semibold">Tweet</span>
                        <p className="text-xs text-white leading-relaxed break-words overflow-hidden whitespace-normal">
                            Immersed myself in nature on a new hiking trail today, breathing in the fresh air and witnessing a family of deer in their natural habitat, which left me feeling deeply connected and rejuvenated.
                        </p>
                        </div>
                    </div>
                    </div>,
                    // Card 2
                    <div key={`api_design_${dupIdx}`} className="inline-block align-top w-96 h-80 bg-gray-900 border border-gray-700 rounded-xl p-6 transition-all duration-300 group mr-8">
                    <div className="flex flex-col gap-4">
                        <div className="space-y-3">
                          <span className="text-xs text-gray-400 font-semibold">Journal</span>
                        <p className="text-xs text-gray-300 leading-relaxed break-words whitespace-normal">
                            Cooked a new recipe for dinner tonight—homemade lasagna with a rich tomato sauce and layers of creamy cheese. The kitchen smelled incredible and everyone went back for seconds. Cooking from scratch is so rewarding!
                        </p>
                        </div>
                        <div className="space-y-3 border-t border-gray-700 pt-4">
                          <span className="text-xs text-gray-400 font-semibold">Tweet</span>
                          <p className="text-xs text-white leading-relaxed break-words overflow-hidden whitespace-normal">
                            Crafted a homemade lasagna from scratch this evening, savoring the rich flavors and the joy of sharing a delicious meal with loved ones, which made the night truly special.
                        </p>
                        </div>
                    </div>
                    </div>,
                    // Card 3
                    <div key={`deployment_${dupIdx}`} className="inline-block align-top w-96 h-80 bg-gray-900 border border-gray-700 rounded-xl p-6 transition-all duration-300 group mr-8">
                    <div className="flex flex-col gap-4">
                        <span className="text-xs text-gray-400 font-semibold">Journal</span>
                        <p className="text-xs text-gray-300 leading-relaxed break-words overflow-hidden whitespace-normal">
                          Finished reading a captivating novel that kept me up all night. The plot twists were unexpected and the characters felt so real. I love getting lost in a good book and this one will stay with me for a long time.
                        </p>
                        <div className="space-y-3 border-t border-gray-700 pt-4">
                          <span className="text-xs text-gray-400 font-semibold">Tweet</span>
                          <p className="text-xs text-white leading-relaxed break-words overflow-hidden whitespace-normal">
                            Just completed a novel that transported me into another world, with characters and twists so vivid that I found myself thinking about them long after turning the last page.
                        </p>
                        </div>
                    </div>
                    </div>,
                    // Card 4
                    <div key={`feature_flag_${dupIdx}`} className="inline-block align-top w-96 h-80 bg-gray-900 border border-blue-700 rounded-xl p-6 transition-all duration-300 group mr-8">
                    <div className="flex flex-col gap-4">
                        <span className="text-xs text-gray-400 font-semibold">Journal</span>
                        <p className="text-xs text-gray-300 leading-relaxed break-words overflow-hidden whitespace-normal">
                          Spent the afternoon painting in the park, experimenting with watercolors and capturing the vibrant colors of spring. It was relaxing and inspiring to create art surrounded by nature.
                        </p>
                        <div className="space-y-3 border-t border-gray-700 pt-4">
                          <span className="text-xs text-gray-400 font-semibold">Tweet</span>
                          <p className="text-xs text-white leading-relaxed break-words overflow-hidden whitespace-normal">
                            Found inspiration painting outdoors today, letting the vibrant colors of spring flow onto the canvas and feeling a deep sense of peace and creativity in the open air.
                        </p>
                        </div>
                    </div>
                    </div>,
                    // Card 5
                    <div key={`refactor_${dupIdx}`} className="inline-block align-top w-96 h-80 bg-gray-900 border border-red-700 rounded-xl p-6 transition-all duration-300 group mr-8">
                    <div className="flex flex-col gap-4">
                        <span className="text-xs text-gray-400 font-semibold">Journal</span>
                        <p className="text-xs text-gray-300 leading-relaxed break-words overflow-hidden whitespace-normal">
                          Attended a thought-provoking lecture on astronomy and the mysteries of the universe. The discussion about black holes and cosmic phenomena left me in awe of how much there is to discover.
                        </p>
                        <div className="space-y-3 border-t border-gray-700 pt-4">
                          <span className="text-xs text-gray-400 font-semibold">Tweet</span>
                          <p className="text-xs text-white leading-relaxed break-words overflow-hidden whitespace-normal">
                            Tonight’s astronomy lecture opened my mind to the wonders of the universe, leaving me inspired to learn more about the mysteries that lie beyond our planet.
                        </p>
                        </div>
                    </div>
                    </div>,
                    // Card 6
                    <div key={`ci_cd_${dupIdx}`} className="inline-block align-top w-96 h-80 bg-gray-900 border border-teal-700 rounded-xl p-6 transition-all duration-300 group mr-8">
                    <div className="flex flex-col gap-4">
                        <span className="text-xs text-gray-400 font-semibold">Journal</span>
                        <p className="text-xs text-gray-300 leading-relaxed break-words overflow-hidden whitespace-normal">
                          Volunteered at the local animal shelter this weekend. Walking the dogs and playing with the cats was both fun and rewarding. It’s amazing how much joy animals can bring into our lives.
                        </p>
                        <div className="space-y-3 border-t border-gray-700 pt-4">
                          <span className="text-xs text-gray-400 font-semibold">Tweet</span>
                          <p className="text-xs text-white leading-relaxed break-words overflow-hidden whitespace-normal">
                            Spent the day at the animal shelter, connecting with the animals and realizing how much happiness and comfort they bring to everyone around them.
                        </p>
                        </div>
                    </div>
                    </div>,
                ])}
                </div>
            </div>

            {/* Second Row - Infinite Marquee (same as first row, but with different cards) */}
            <div className="overflow-x-hidden w-full">
                <div className="marquee-infinite-reverse">
                {[...Array(2)].flatMap((_, dupIdx) => [
                    // Card 1
                    <div key={`webassembly_${dupIdx}`} className="inline-block align-top w-96 h-80 bg-gray-900 border border-green-400 rounded-xl p-6 transition-all duration-300 group mr-8">
                    <div className="flex flex-col gap-4">
                        <div className="space-y-3">
                          <span className="text-xs text-gray-400 font-semibold">Journal</span>
                        <p className="text-xs text-gray-300 leading-relaxed break-words overflow-hidden whitespace-normal">
                            Tried my hand at baking sourdough bread for the first time. The process was challenging but incredibly satisfying, and the aroma of fresh bread filled the house. Sharing the warm loaf with friends made the effort worthwhile.
                        </p>
                        </div>
                        <div className="space-y-3 border-t border-gray-700 pt-4">
                          <span className="text-xs text-gray-400 font-semibold">Tweet</span>
                          <p className="text-xs text-white leading-relaxed break-words overflow-hidden whitespace-normal">
                            Baked my first sourdough loaf today, and the joy of slicing into a warm, crusty bread I made from scratch was truly unforgettable.
                        </p>
                        </div>
                    </div>
                    </div>,
                    // Card 2
                    <div key={`mentoring_${dupIdx}`} className="inline-block align-top w-96 h-80 bg-gray-900 border border-purple-400 rounded-xl p-6 transition-all duration-300 group mr-8">
                    <div className="flex flex-col gap-4">
                        <div className="space-y-3">
                          <span className="text-xs text-gray-400 font-semibold">Journal</span>
                        <p className="text-xs text-gray-300 leading-relaxed break-words overflow-hidden whitespace-normal">
                            Spent the afternoon mentoring a junior developer, guiding them through their first big project. Watching their confidence grow and seeing their excitement as they solved problems was incredibly rewarding.
                        </p>
                        </div>
                        <div className="space-y-3 border-t border-gray-700 pt-4">
                          <span className="text-xs text-gray-400 font-semibold">Tweet</span>
                          <p className="text-xs text-white leading-relaxed break-words overflow-hidden whitespace-normal">
                            Mentored a new developer today and felt proud seeing them overcome challenges and celebrate their progress.
                        </p>
                        </div>
                    </div>
                    </div>,
                    // Card 3
                    <div key={`architecture_${dupIdx}`} className="inline-block align-top w-96 h-80 bg-gray-900 border border-orange-400 rounded-xl p-6 transition-all duration-300 group mr-8">
                    <div className="flex flex-col gap-4">
                        <div className="space-y-3">
                          <span className="text-xs text-gray-400 font-semibold">Journal</span>
                        <p className="text-xs text-gray-300 leading-relaxed break-words overflow-hidden whitespace-normal">
                            Visited a local art gallery and was captivated by the creativity and emotion in each piece. The experience sparked new ideas for my own creative projects and reminded me of the power of art to inspire.
                        </p>
                        </div>
                        <div className="space-y-3 border-t border-gray-700 pt-4">
                          <span className="text-xs text-gray-400 font-semibold">Tweet</span>
                          <p className="text-xs text-white leading-relaxed break-words overflow-hidden whitespace-normal">
                            Left the art gallery today feeling inspired and full of new ideas, amazed by the stories and emotions captured in every painting.
                        </p>
                        </div>
                    </div>
                    </div>,
                    // Card 4
                    <div key={`dark_mode_${dupIdx}`} className="inline-block align-top w-96 h-80 bg-gray-900 border border-pink-700 rounded-xl p-6 transition-all duration-300 group mr-8">
                    <div className="flex flex-col gap-4">
                        <div className="space-y-3">
                          <span className="text-xs text-gray-400 font-semibold">Journal</span>
                        <p className="text-xs text-gray-300 leading-relaxed break-words overflow-hidden whitespace-normal">
                            Took a spontaneous road trip along the coast, stopping at small towns and hidden beaches. The freedom of the open road and the beauty of the ocean made for an unforgettable adventure.
                        </p>
                        </div>
                        <div className="space-y-3 border-t border-gray-700 pt-4">
                          <span className="text-xs text-gray-400 font-semibold">Tweet</span>
                          <p className="text-xs text-white leading-relaxed break-words overflow-hidden whitespace-normal">
                            Spent the day exploring the coastline on a road trip, discovering new places and making memories that will last a lifetime.
                        </p>
                        </div>
                    </div>
                    </div>,
                    // Card 5
                    <div key={`docs_${dupIdx}`} className="inline-block align-top w-96 h-80 bg-gray-900 border border-yellow-700 rounded-xl p-6 transition-all duration-300 group mr-8">
                    <div className="flex flex-col gap-4">
                        <div className="space-y-3">
                          <span className="text-xs text-gray-400 font-semibold">Journal</span>
                        <p className="text-xs text-gray-300 leading-relaxed break-words overflow-hidden whitespace-normal">
                            Hosted a game night with friends, filled with laughter, strategy, and a little friendly competition. It was a perfect way to unwind and strengthen our bonds.
                        </p>
                        </div>
                        <div className="space-y-3 border-t border-gray-700 pt-4">
                          <span className="text-xs text-gray-400 font-semibold">Tweet</span>
                          <p className="text-xs text-white leading-relaxed break-words overflow-hidden whitespace-normal">
                            Game night with friends was a blast, full of laughter and great memories that made me appreciate the joy of good company.
                        </p>
                        </div>
                    </div>
                    </div>,
                    // Card 6
                    <div key={`oncall_${dupIdx}`} className="inline-block align-top w-96 h-80 bg-gray-900 border border-lime-700 rounded-xl p-6 transition-all duration-300 group mr-8">
                    <div className="flex flex-col gap-4">
                        <div className="space-y-3">
                          <span className="text-xs text-gray-400 font-semibold">Journal</span>
                        <p className="text-xs text-gray-300 leading-relaxed break-words overflow-hidden whitespace-normal">
                            Spent a quiet morning journaling at my favorite coffee shop, reflecting on recent experiences and setting intentions for the week ahead. The peaceful atmosphere helped me find clarity and motivation.
                        </p>
                        </div>
                        <div className="space-y-3 border-t border-gray-700 pt-4">
                          <span className="text-xs text-gray-400 font-semibold">Tweet</span>
                          <p className="text-xs text-white leading-relaxed break-words overflow-hidden whitespace-normal">
                            Started my day with coffee and reflection, feeling focused and ready to take on new challenges with a clear mind.
                        </p>
                        </div>
                    </div>
                    </div>,
                ])}
                </div>
            </div>
            </div>
        </div>
      </section>
    )
}

export default Marquee;