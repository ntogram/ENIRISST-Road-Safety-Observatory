package com.enirisst.rso_api.helper.greeksorting;

import java.text.Collator;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Locale;

public class GreekCollator {
    private static final Locale GREEK_LOCALE = new Locale("el", "GR");
    private static final int NO_COLLATOR = -1;

    public enum CollatorEnum {
        NoCollator(NO_COLLATOR),
        Primary(Collator.PRIMARY),
        Secondary(Collator.SECONDARY),
        Tertiary(Collator.TERTIARY),
        Identical(Collator.IDENTICAL);

        private int collatorStrength;
        CollatorEnum(int collatorStrength) {
            this.collatorStrength = collatorStrength;
        }
    }

    public static List<String> sort(List<String> aWords, CollatorEnum collatorEnum) {
        if (collatorEnum.collatorStrength < 0) {
            Collections.sort(aWords);
        } else {
            Collator collator = Collator.getInstance(GREEK_LOCALE);
            collator.setStrength(collatorEnum.collatorStrength);
            Collections.sort(aWords, collator);
        }
//        for (String a:aWords){
//            System.out.println(a);
//        }
        return aWords;
      //  System.out.println(aWords.toString() + " " + collatorEnum);
    }

    private static void compare(String aThis, String aThat, CollatorEnum collatorEnum) {
        int comparison = 999;
        if (collatorEnum.collatorStrength < 0) {
            comparison = aThis.compareTo(aThat);
        } else {
            Collator collator = Collator.getInstance(GREEK_LOCALE);
            collator.setStrength(collatorEnum.collatorStrength);
            comparison = collator.compare(aThis, aThat);
        }
        if (comparison == 0) {
            System.out.println("Collator sees them as the same : " + aThis
                    + ", " + aThat + " - " + collatorEnum);
        } else {
            System.out.println("Collator sees them as DIFFERENT  : " + aThis
                    + ", " + aThat + " - " + collatorEnum);
        }
    }

}