import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Clock, TrendingUp, DollarSign, Users, Euro } from "lucide-react";
import { useState } from "react";

export default function RoiSection() {
  // Display values (strings for better UX)
  const [employeesDisplay, setEmployeesDisplay] = useState("8");
  const [hourlyWageDisplay, setHourlyWageDisplay] = useState("15");
  const [hoursPerWeekDisplay, setHoursPerWeekDisplay] = useState("40");
  const [timeSavedPerWeekDisplay, setTimeSavedPerWeekDisplay] = useState("12");
  const [errorReductionPercentDisplay, setErrorReductionPercentDisplay] = useState("30");
  const [currentErrorCostsPerMonthDisplay, setCurrentErrorCostsPerMonthDisplay] = useState("800");

  // Convert to numbers for calculations (default to 0 if empty)
  const employees = Number(employeesDisplay) || 0;
  const hourlyWage = Number(hourlyWageDisplay) || 0;
  const hoursPerWeek = Number(hoursPerWeekDisplay) || 0;
  const timeSavedPerWeek = Number(timeSavedPerWeekDisplay) || 0;
  const errorReductionPercent = Number(errorReductionPercentDisplay) || 0;
  const currentErrorCostsPerMonth = Number(currentErrorCostsPerMonthDisplay) || 0;

  // ROI Berechnungen
  const weeksPerYear = 50;
  const timeSavings = employees * (timeSavedPerWeek / hoursPerWeek) * hourlyWage * hoursPerWeek * weeksPerYear;
  const errorSavings = (currentErrorCostsPerMonth * 12) * (errorReductionPercent / 100);
  const totalAnnualSavings = timeSavings + errorSavings;
  
  const systemCosts = 75000;
  const netSavings = Math.max(0, totalAnnualSavings - systemCosts);
  const roi = systemCosts > 0 ? Math.round((netSavings / systemCosts) * 100) : 0;
  const paybackMonths = totalAnnualSavings > 0 ? Math.round((systemCosts / totalAnnualSavings) * 12) : 0;

  const inputConfigs = [
    {
      label: "Anzahl Mitarbeiter",
      value: employeesDisplay,
      setValue: setEmployeesDisplay,
      min: 1,
      max: 50,
      icon: Users,
      color: "text-amber-500"
    },
    {
      label: "Stundenlohn (€)",
      value: hourlyWageDisplay,
      setValue: setHourlyWageDisplay,
      min: 10,
      max: 30,
      icon: Euro,
      color: "text-green-500"
    },
    {
      label: "Wochenstunden pro MA",
      value: hoursPerWeekDisplay,
      setValue: setHoursPerWeekDisplay,
      min: 20,
      max: 50,
      icon: Clock,
      color: "text-blue-500"
    },
    {
      label: "Zeitersparnis/Woche (h)",
      value: timeSavedPerWeekDisplay,
      setValue: setTimeSavedPerWeekDisplay,
      min: 5,
      max: 30,
      icon: TrendingUp,
      color: "text-purple-500"
    },
    {
      label: "Fehlerreduktion (%)",
      value: errorReductionPercentDisplay,
      setValue: setErrorReductionPercentDisplay,
      min: 10,
      max: 80,
      icon: DollarSign,
      color: "text-red-500"
    },
    {
      label: "Aktuelle Fehlerkosten/Monat (€)",
      value: currentErrorCostsPerMonthDisplay,
      setValue: setCurrentErrorCostsPerMonthDisplay,
      min: 200,
      max: 3000,
      icon: Calculator,
      color: "text-orange-500"
    }
  ];

  return (
    <section id="roi" className="py-20 bg-gradient-to-b from-stone-900 to-red-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6">Effizienz-Prognose: Messbare Verbesserungen</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Konservative Schätzungen der Effizienzsteigerungen durch Automatisierung und 
            Prozessoptimierung in Ihrem Betrieb.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-card border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Interaktiver Effizienz-Rechner</CardTitle>
                <p className="text-slate-400">Passen Sie die Werte an Ihre Betriebsgröße an</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {inputConfigs.map((config, index) => (
                    <motion.div 
                      key={config.label}
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Label className="flex items-center text-sm font-medium text-stone-300">
                        <config.icon className={`w-4 h-4 mr-2 ${config.color}`} />
                        {config.label}
                      </Label>
                      <Input
                        type="number"
                        value={config.value}
                        onChange={(e) => config.setValue(e.target.value)}
                        onFocus={(e) => config.setValue("")}
                        min={config.min}
                        max={config.max}
                        className="bg-stone-900/50 border-stone-700 text-stone-100 focus:border-amber-500 hover:border-amber-600/50 transition-colors [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                      />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-card border-blue-900/30 bg-gradient-to-br from-blue-950/20 to-purple-950/20 hover-lift">
              <CardHeader>
                <CardTitle className="text-blue-400">Abkürzungen & Begriffe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-400">ROI:</span>
                    <span className="text-stone-300">Return on Investment</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">ERP:</span>
                    <span className="text-stone-300">Enterprise Resource Planning</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">IoT:</span>
                    <span className="text-stone-300">Internet of Things</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">HACCP:</span>
                    <span className="text-stone-300">Hazard Analysis Critical Control Points</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">KI:</span>
                    <span className="text-stone-300">Künstliche Intelligenz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">MA:</span>
                    <span className="text-stone-300">Mitarbeiter</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-green-900/30 bg-gradient-to-br from-green-950/20 to-amber-950/20 hover-lift">
              <CardHeader>
                <CardTitle className="text-green-400">ROI-Analyse Ergebnis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-amber-500/10 rounded-lg border border-amber-900/30 hover-lift">
                    <Euro className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-amber-400">€{Math.round(totalAnnualSavings).toLocaleString()}</div>
                    <div className="text-xs text-stone-400">Jährliche Einsparungen</div>
                  </div>
                  <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-900/30 hover-lift">
                    <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-400">{roi}%</div>
                    <div className="text-xs text-stone-400">ROI pro Jahr</div>
                  </div>
                </div>

                <div className="space-y-4 border-t border-stone-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400">Zeitersparnis (€/Jahr):</span>
                    <span className="text-green-400 font-medium">€{Math.round(timeSavings).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400">Fehlerreduktion (€/Jahr):</span>
                    <span className="text-green-400 font-medium">€{Math.round(errorSavings).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400">Systemkosten (€/Jahr):</span>
                    <span className="text-red-400 font-medium">-€{systemCosts.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-stone-700 pt-2">
                    <span className="text-stone-300 font-semibold">Netto-Ersparnis:</span>
                    <span className="text-green-400 font-bold text-lg">€{Math.round(netSavings).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-red-900/30 bg-gradient-to-br from-red-950/20 to-amber-950/20 hover-lift">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold meat-gradient mb-2">
                  {paybackMonths} Monate
                </div>
                <div className="text-stone-300">bis zur Amortisation</div>
                <div className="text-sm text-stone-400 mt-2">
                  Danach: €{Math.round(totalAnnualSavings/12).toLocaleString()}/Monat Einsparung
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
