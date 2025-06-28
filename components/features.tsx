import { Award, CheckCircle, Shield, Target } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

function Features() {
  return (
        <section id="services" className="bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a] py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <p className=" ml-4 text-6xl font-black mb-2 flex justify-center items-center bg-clip-text py-4 text-transparent bg-gradient-to-r from-white via-gray-400 to-white drop-shadow-lg">Why Choose Chauhan?</p>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We&apos;re committed to providing the highest quality second-hand firearms with complete transparency and
                  professional service.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className='bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a]'>
                <CardHeader className="text-center">
                  <Shield className="h-12 w-12 mx-auto text-red-600" />
                  <CardTitle className='bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-400 to-white drop-shadow-lg py-2'>Expert Inspection</CardTitle>
                  <CardDescription className='text-white'>Every firearm undergoes rigorous inspection by certified gunsmiths</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-white">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Mechanical function testing
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Bore and barrel inspection
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Safety mechanism verification
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className='bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a]'>
                <CardHeader className="text-center">
                  <Award className="h-12 w-12 mx-auto text-red-600" />
                  <CardTitle className='bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-400 to-white drop-shadow-lg py-2'>Quality Guarantee</CardTitle>
                  <CardDescription className='text-white'>Guarantee on all firearms haha haha hahah</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-white">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Woww iwow owowo
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Detailed condition reports
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Authenticity certification
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className='bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a]'>
                <CardHeader className="text-center">
                  <Target className="h-12 w-12 mx-auto text-red-600" />
                  <CardTitle className='bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-400 to-white drop-shadow-lg py-2'>Sports Focused</CardTitle>
                  <CardDescription className='text-white'>Curated selection for competitive and recreational shooting</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-white">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Competition-grade firearms
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Hunting rifles and pistols
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Target shooting specialists
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
  )
}

export default Features